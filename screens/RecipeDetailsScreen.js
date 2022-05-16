import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    View
} from 'react-native';
import {
    Button,
    Chip,
    Dialog,
    Paragraph,
    RadioButton,
    Title
} from 'react-native-paper';
import * as Linking from 'expo-linking';
import styles from '../AppStyle';
import { auth, db } from "../firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { getCategories } from "../components/RecipeCategories";
import { showToast } from "../components/Toast";

const RecipeDetailsScreen = ({ route, navigation }) => {
    const { recipe, saved } = route.params;
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => setIsSaved(saved), [saved]);

    // handles dialog visibility
    const showDialog = () => setDialogOpen(true);
    const hideDialog = () => setDialogOpen(false);

    // gets categories and image url from Firestore
    const showCategories = async () => {
        const categories = await getCategories();
        setCategories(categories);
        setSelectedCategory(categories[0].id);
        showDialog();
    }
    // saves recipe to Firestore (user's recipe collection)
    const saveRecipe = async () => {
        hideDialog();
        try {
            await addDoc(collection(db, `recipes/${auth.currentUser.uid}/userRecipes`), {
                label: recipe.label,
                image: recipe.image,
                ingredients: recipe.ingredients,
                url: recipe.url,
                category: selectedCategory
            })
            showToast('Recipe saved')
            navigation.goBack();
        } catch (error) {
            showToast('Failed to save recipe')
        }
    }
    // deletes recipe from Firestore (user's recipe collection)
    const deleteRecipe = async () => {
        hideDialog();
        try {
            await deleteDoc(doc(db, `recipes/${auth.currentUser.uid}/userRecipes`, recipe.id));
            navigation.navigate('Recipes');
        } catch (error) {
            console.log(error);
        }
    }
    // opens recipes instructions in a browser
    const openInstructionsInBrowser = (url) => {
        Linking.openURL(url);
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <ImageBackground
                source={{ uri: recipe.image }}
                resizeMode="cover"
                style={styles.recipeImg}>
            </ImageBackground>
            <View style={styles.recipeDetails}>
                <View>
                    <Title style={styles.recipeCardTitle}>{recipe.label}</Title>
                </View>
                <View style={styles.test}>
                    {recipe.ingredients.map((item, index) => (
                        <Chip
                            key={index}
                            textStyle={{ width: 'auto', fontSize: 16, fontWeight: '700' }}
                            style={styles.ingredientsChips}>
                            {item.text}
                        </Chip>
                    ))}
                </View>
            </View>
            <View style={styles.recipeCardActions}>
                <Button
                icon="open-in-new"
                    onPress={() => openInstructionsInBrowser(recipe.url)}
                    labelStyle={styles.openInstrButton}>
                    Open instructions in browser
                </Button>
                {isSaved ? (
                    <View style={styles.recipeCardButtons}>
                        <Button icon="playlist-edit" mode="text" onPress={() => navigation.navigate('Ingredients', { ingredients: recipe.ingredients })} labelStyle={styles.recipeCardButtonBcColor}>
                            Add ingredients to list
                        </Button>
                        <Button icon="delete" mode="text" onPress={() => showDialog()} labelStyle={styles.recipeCardButtonTxtColor}>
                            Delete
                        </Button>
                    </View>)
                    : (
                        <Button icon="plus-box-multiple" mode="text" onPress={() => showCategories()} labelStyle={styles.recipeCardSaveButtonColor}>
                            Save Recipe
                        </Button>)
                }
            </View>
            {isSaved ? (
                <Dialog visible={dialogOpen} onDismiss={hideDialog} >
                    <Dialog.Title>Are you sure?</Dialog.Title>
                    <Dialog.Content>
                        <Dialog.Content>
                            <Paragraph>Do you really want to remove this recipe?</Paragraph>
                        </Dialog.Content>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={deleteRecipe}>Delete</Button>
                    </Dialog.Actions>
                </Dialog>)
                : (
                    <Dialog visible={dialogOpen} onDismiss={hideDialog} >
                        <Dialog.Title>Select category for recipe</Dialog.Title>
                        <Dialog.Content>
                            <RadioButton.Group onValueChange={selectedCategory => setSelectedCategory(selectedCategory)} value={selectedCategory}>
                                {categories.map((item) => (
                                    <RadioButton.Item
                                        key={item.id}
                                        label={item.category}
                                        value={item.id}
                                        labelStyle={{
                                            fontSize: 18,
                                            textTransform: 'capitalize',
                                        }}
                                    />
                                ))}
                            </RadioButton.Group>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Cancel</Button>
                            <Button onPress={saveRecipe}>Save</Button>
                        </Dialog.Actions>
                    </Dialog >)
            }
        </ScrollView>
    );
}
export default RecipeDetailsScreen;
