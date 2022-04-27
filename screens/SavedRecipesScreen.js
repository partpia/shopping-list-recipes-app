import React, { useEffect, useState } from "react";
import { FlatList, View } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const SavedRecipesScreen = ({ navigation, route }) => {
    const [recipes, setRecipes] = useState([]);
    const { categoryId } = route.params;

    useEffect(() => { getRecipes(); }, []);

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
        <View>
            <FlatList
                data={recipes}
                renderItem={({ item }) => (
                    <Card
                        onPress={() => navigation.navigate('Recipe Details', { recipe: item })}>
                        <Card.Content>
                            <Title>{item.name}</Title>
                        </Card.Content>
                        <Card.Cover source={{ uri: item.imageUrl }} />
                        <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Ok</Button>
                        </Card.Actions>
                    </Card>
                )}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}
export default SavedRecipesScreen;
