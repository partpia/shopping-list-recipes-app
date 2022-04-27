import React, { useState } from "react";
import {
    ImageBackground,
    ScrollView,
    View
} from 'react-native';
import {
    Button,
    Chip,
    Dialog,
    Divider,
    Paragraph,
    RadioButton,
    Text,
    Title
} from 'react-native-paper';
import styles from '../AppStyle';
import { auth, db } from "../firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { getCategories } from "../components/RecipeCategories";

const RecipeDetailsScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(true);

    const showDialog = () => setDialogOpen(true);
    const hideDialog = () => setDialogOpen(false);

    const showCategories = async () => {
        const categories = await getCategories();
        setCategories(categories);
        setSelectedCategory(categories[0].id);
        showDialog();
    }

    const saveRecipe = async () => {
        hideDialog();
        try {
            await addDoc(collection(db, `recipes/${auth.currentUser.uid}/userRecipes`), {
                label: recipe.label,
                imageUrl: recipe.image,
                ingredients: recipe.ingredients,
                instructionsUrl: recipe.url,
                category: selectedCategory
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRecipe = async () => {
        hideDialog();
        try {
            await deleteDoc(doc(db, `recipes/${auth.currentUser.uid}/userRecipes`, recipe.id));
            navigation.navigate('Recipes');
        } catch (error) {
            console.log(error);
        }
    }

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
                    <Title>{recipe.label}</Title>
                </View>
                <View style={styles.test}>
                    {recipe.ingredients.map((item, index) => (
                        <Chip
                            key={index}
                            textStyle={{ width: 'auto' }}
                            style={styles.ingredientsChips}>
                            {item.text}
                        </Chip>
                    ))}
                </View>
                <Divider style={styles.divider} />
                <Text>Link to instructions: {recipe.url}</Text>
                {isSaved ? (
                    <Button icon="plus-box-multiple" mode="contained" onPress={() => showDialog()}>
                        Remove Recipe
                    </Button>)
                    : (
                        <Button icon="plus-box-multiple" mode="contained" onPress={() => showCategories()}>
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
