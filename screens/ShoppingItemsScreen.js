import React, { useEffect, useState } from "react";
import { ScrollView, View } from 'react-native';
import { Button, Divider, Headline, List, Subheading } from 'react-native-paper';
import { auth, db } from "../firebase";
import { arrayRemove, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import styles from '../AppStyle';
import AddItemToList from "../components/AddItemToList";
import { showToast } from "../components/Toast";
import { useIsFocused } from '@react-navigation/native';

const ShoppingItemsScreen = ({ route }) => {
    const { listId } = route.params;
    const [items, setItems] = useState([]);
    const [itemsPickedUp, setItemsPickedUp] = useState([]);
    const [sections, setSections] = useState([]);
    const [noItems, setNoItems] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        getSections();
        getShoppingListItems();
    }, [])

    isFocused

    // gets sections that user has saved
    const getSections = async () => {
        try {
            const tempSections = [];
            const q = query(collection(db, `sections/${auth.currentUser.uid}/userSections`))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let tempSection = {};
                tempSection = doc.data();
                tempSection.id = doc.id;
                tempSections.push(tempSection);
            });
            setSections(tempSections);
        } catch (error) {
            showToast('Failed to get sections')
        }
    }
    // gets selected shopping list's items
    const getShoppingListItems = async () => {
        try {
            const docRef = doc(db, `items/${listId}`);
            const docSnap = await getDoc(docRef);
            const active = docSnap.data().active;

            if (docSnap.exists()) {
                if (active.length === 0) {
                    setNoItems(true);
                }
                else {
                    setItems(active);
                }
            }
        } catch (error) {
            showToast('Failed to get items')
        }
    }
    // moves item from list to 'picked up'-list
    const removeFromList = (item) => {
        setItemsPickedUp([...itemsPickedUp, item])
        const tempList = items.filter(obj => obj !== item);
        setItems(tempList);
    }
    // moves item from 'picked up'-list to list
    const addToList = (item) => {
        setItems([...items, item])
        const tempList = itemsPickedUp.filter(obj => obj !== item);
        setItemsPickedUp(tempList);
    }

    const deletePickedUps = async () => {
        await itemsPickedUp.forEach((item) => {
            try {
                updateDoc(doc(db, 'items', listId), {
                    active: arrayRemove(item)
                });
            } catch (error) {
                console.log(error)
            }
        })
        getShoppingListItems();
    }

    return (
        <ScrollView style={styles.shoppingItemsContainer}>
            {noItems ? (
                <View style={styles.noShoppingListView}>
                    <Headline>Nothing in the list yet!</Headline>
                    <Subheading>Add first one</Subheading>
                </View>
            ) : (
                <View>
                    <Button
                        onPress={() => deletePickedUps()}
                        mode='contained'
                        style={styles.addItemButton}>
                        Delete picked ups
                    </Button>
                    {sections.map((section) => (
                        <List.Section title={section.name} titleStyle={styles.sectionTitle} key={section.id}>
                            {items &&
                                items.filter(active => active.section === section.id).map((item, index) => (
                                    <List.Item
                                        title={item.food + '  ' + item.quantity + ' ' + item.measure}
                                        titleStyle={styles.itemTitle}
                                        left={props => <List.Icon {...props} icon='checkbox-multiple-blank-circle-outline' key={index} />}
                                        onPress={() => removeFromList(item)}
                                        key={index} />
                                ))
                            }
                            <Divider />
                        </List.Section>
                    ))
                    }
                    <List.Section title="Recipes" titleStyle={styles.sectionTitle}>
                        {items.filter(active => active.section === 'recipes').map((item, index) => (
                            <List.Item
                                title={item.food + '  ' + item.quantity + ' ' + item.measure}
                                titleStyle={styles.itemTitle}
                                left={props => <List.Icon {...props} icon='checkbox-multiple-blank-circle-outline' key={index} />}
                                onPress={() => removeFromList(item)}
                                key={index} />
                        ))}
                    </List.Section>
                    <List.Section title="Picked up" titleStyle={styles.sectionTitle}>
                        {itemsPickedUp.map((item, index) => (
                            <List.Item
                                title={item.food + '  ' + item.quantity + ' ' + item.measure}
                                titleStyle={styles.itemsPickedUp}
                                left={props => <List.Icon {...props} icon='checkbox-multiple-marked-circle-outline' key={index} />}
                                onPress={() => addToList(item)}
                                key={index} />
                        ))}
                    </List.Section>
                </View>)}
            <AddItemToList listId={listId} sections={sections} getShoppingListItems={getShoppingListItems} />
        </ScrollView>
    );
}
export default ShoppingItemsScreen;
