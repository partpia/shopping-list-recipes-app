import React, { useState, useEffect } from "react";
import { ScrollView, View } from 'react-native';
import {
    Button,
    Chip,
    Headline,
    RadioButton,
    Text,
} from 'react-native-paper';
import { auth, db } from "../firebase";
import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    updateDoc
} from "firebase/firestore";
import { showToast } from "../components/Toast";
import styles from '../AppStyle';

const IngredientsToListScreen = ({ navigation, route }) => {
    const { ingredients } = route.params;
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [shoppingLists, setShoppingLists] = useState([]);
    const [selectedList, setSelectedList] = useState('');

    useEffect(() => getShoppingLists(), []);
    useEffect(() => setSelectedIngredients(ingredients), [ingredients]);

    // gets shopping lists from Firestore
    const getShoppingLists = async () => {
        try {
            const tempLists = [];
            const q = query(collection(db, `lists/${auth.currentUser.uid}/userLists`))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let tempList = {};
                tempList = doc.data();
                tempList.id = doc.id;
                tempLists.push(tempList);
            });
            setShoppingLists(tempLists);
        } catch (error) {
            console.log(error);
        }
    }
    // removes selected ingredients
    const handleIngredientChange = (id) => {
        const currentIngredients = selectedIngredients.filter((ingr) => ingr.foodId !== id);
        setSelectedIngredients(currentIngredients);
    }

    // gets needed ingredients details and adds section 'recipes'
    const handleIngredients = () => {
        let tempIngredients = [];

        selectedIngredients.forEach((item) => {
            let tempObj = {
                food: item.food,
                measure: item.measure,
                quantity: item.quantity,
                section: 'recipes'
            }
            tempIngredients.push(tempObj)
        })
        saveIngredients(tempIngredients);
    }
    // saves ingredients to selected list
    const saveIngredients = async (list) => {
        await list.forEach((item) => {
            try {
                updateDoc(doc(db, 'items', selectedList), {
                    active: arrayUnion(item)
                });
            } catch (error) {
                showToast('Failed to save ingredients');
            }
        })
        navigation.goBack('Recipe Details');
    }

    return (
        <ScrollView style={styles.ingrToListContainer}>
            <Text style={styles.instructionTxt}>SELECT INGREDIENTS TO SHOPPING LIST</Text>
            <View style={styles.test}>
                {selectedIngredients.map((item, index) => (
                    <Chip
                        key={index}
                        onPress={() => handleIngredientChange(item.foodId)}
                        textStyle={{ width: 'auto', fontSize: 16, fontWeight: '700' }}
                        style={styles.ingredientsChips}>
                        {item.text}
                    </Chip>
                ))}
            </View>
            <Text style={styles.instructionTxt}>SELECT SHOPPING LIST</Text>
            {shoppingLists.length === 0 ? (
                <View style={styles.noShoppingListView}>
                    <Headline>No shopping lists yet!</Headline>
                </View>
            ) : (
                <RadioButton.Group onValueChange={newValue => setSelectedList(newValue)} value={selectedList}>
                    {shoppingLists.map((item) => (
                        <RadioButton.Item
                            key={item.id}
                            label={item.name}
                            value={item.id}
                            labelStyle={{
                                fontSize: 18,
                                textTransform: 'capitalize',
                            }}
                        />
                    ))}
                </RadioButton.Group>)
            }
            <Button
                mode='contained'
                onPress={() => handleIngredients()}
                style={styles.bottomButton}
                labelStyle={{ color: 'black' }}>
                Add
            </Button>
        </ScrollView>
    );
}
export default IngredientsToListScreen;
