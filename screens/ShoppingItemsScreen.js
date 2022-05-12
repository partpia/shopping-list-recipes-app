import React, { useEffect, useState } from "react";
import { ScrollView, View } from 'react-native';
import { Button, Divider, List } from 'react-native-paper';
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import styles from '../AppStyle';
import AddItemToList from "../components/AddItemToList";

const ShoppingItemsScreen = ({ navigation, route }) => {
    const { listId } = route.params;
    const [items, setItems] = useState([]);
    const [itemsPickedUp, setItemsPickedUp] = useState([]);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        getSections();
        getShoppingListItems();
    }, [])

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
            //console.log(tempSections);
        } catch (error) {
            console.log(error);
        }
    }

    const getShoppingListItems = async () => {
        try {
            const docRef = doc(db, `items/${listId}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setItems(docSnap.data().active);
                setItemsPickedUp(docSnap.data().inactive)
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const removeFromList = (item) => {
        setItemsPickedUp([...itemsPickedUp, item])
        const tempList = items.filter(obj => obj !== item);
        setItems(tempList);
    }

    const addBackToList = (item) => {
        setItems([...items, item])
        const tempList = itemsPickedUp.filter(obj => obj !== item);
        setItemsPickedUp(tempList);
    }

    const test = () => {
        console.log('ITEMS')
        console.log(items);
        console.log('PICKED')
        console.log(itemsPickedUp);
    }

    return (
        <ScrollView>
            <View style={styles.shoppingItemsContainer}>
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
                ))}
                <List.Section title="Picked up" titleStyle={styles.sectionTitle}>
                    {itemsPickedUp &&
                        itemsPickedUp.map((item, index) => (
                            <List.Item
                                title={item.food + '  ' + item.quantity + ' ' + item.measure}
                                titleStyle={styles.itemsPickedUp}
                                left={props => <List.Icon {...props} icon='checkbox-multiple-marked-circle-outline' key={index} />}
                                onPress={() => addBackToList(item)}
                                key={index} />
                        ))
                    }
                </List.Section>
                <Button onPress={() => test()}>Test</Button>
                <AddItemToList />
            </View>
        </ScrollView>
    );

}
export default ShoppingItemsScreen;
