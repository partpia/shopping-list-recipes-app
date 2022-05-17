import React, { useEffect, useState } from "react";
import { FlatList, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import styles from '../AppStyle';

const SavedRecipesScreen = ({ navigation, route }) => {
    const [recipes, setRecipes] = useState([]);
    const { categoryId } = route.params;

    useEffect(() => getRecipes(), []);

    // gets user's recipes from Firestore
    const getRecipes = async () => {
        let tempList = [];

        try {
            const q = query(collection(db, `recipes/${auth.currentUser.uid}/userRecipes`), where('category', '==', categoryId));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                let tempRecipe = {};
                tempRecipe = doc.data();
                tempRecipe.id = doc.id;
                tempList.push(tempRecipe);
            })
            setRecipes(tempList);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.savedRecipesContainer}>
            {recipes.length > 0 ? (
                <FlatList
                    data={recipes}
                    renderItem={({ item }) => (
                        <View style={styles.savedRecipesList}>
                            <Card
                                style={styles.savedRecipesCardList}
                                onPress={() => navigation.navigate('Recipe Details', { recipe: item, saved: true })}>
                                <Card.Cover
                                    source={{ uri: item.image }}
                                    style={styles.savedRecipeCard} />
                                <Card.Content>
                                    <Title style={styles.savedRecipeCardTitle}>{item.label}</Title>
                                </Card.Content>
                            </Card>
                        </View>
                    )}
                    keyExtractor={(item, index) => index}
                />
            ) : (
                <View style={styles.noShoppingListView}>
                    <Title>You don't have any recipes yet</Title>
                </View>
            )}
        </View>
    );
}
export default SavedRecipesScreen;
