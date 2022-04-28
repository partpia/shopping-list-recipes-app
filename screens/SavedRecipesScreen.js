import React, { useEffect, useState } from "react";
import { FlatList, View } from 'react-native';
import { Card, Divider, Title } from 'react-native-paper';
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import styles from '../AppStyle';

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
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }}
                data={recipes}
                renderItem={({ item }) => (
                    <Card
                        onPress={() => navigation.navigate('Recipe Details', { recipe: item, saved: true })}>
                        <Card.Cover source={{ uri: item.image }} />
                        <Card.Content>
                            <Title>{item.label}</Title>
                        </Card.Content>
                        <Divider style={styles.divider} />
                    </Card>
                )}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}
export default SavedRecipesScreen;
