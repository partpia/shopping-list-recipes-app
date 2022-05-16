import React, { useEffect, useState } from "react";
import { Alert, View, FlatList } from 'react-native';
import { Headline, List, Subheading } from 'react-native-paper';
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { showToast } from "./Toast";
import styles from '../AppStyle';

const ShoppingLists = ({ navigation }) => {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [noList, setNoList] = useState(false);

    useEffect(() => {
        getShoppingLists();
    }, []);

    // gets user's shopping lists from Firestore
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
            tempLists.length === 0 ? setNoList(true) : setShoppingLists(tempLists);
        } catch (error) {
            console.log(error);
        }
    }
    // checks if user really wants to delete the list
    const showAlert = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete the list?',
            [
                { text: "Cancel", onPress: () => { } },
                { text: "Delete", onPress: () => {deleteList(id)} },
            ]
        );
    }
    // deletes list from Firestore
    const deleteList = async (id) => {
        try {
            await deleteDoc(doc(db, `lists/${auth.currentUser.uid}/userLists`, id));
            showToast('List deleted')
            getShoppingLists();
        } catch (error) {
            showToast('Failed to delete list')
        }
    }

    return (
        <View style={styles.shoppingListView}>
            {noList ? (
                <View style={styles.noShoppingListView}>
                    <Headline>No shopping lists yet!</Headline>
                    <Subheading>Add first one</Subheading>
                </View>
            ) : (
                <FlatList
                    data={shoppingLists}
                    renderItem={({ item, index }) => (
                        <List.Item
                            title={item.name}
                            titleStyle={{ fontWeight: '700' }}
                            onPress={() => navigation.navigate('Groceries', { listId: item.id })}
                            onLongPress={() => showAlert(item.id)}
                            key={item.id}
                            left={props =>
                                <List.Icon {...props}
                                    icon={item.avatarIcon}
                                    key={index}
                                />}
                        />
                    )}
                >
                </FlatList>)
            }
        </View>
    );
}
export default ShoppingLists;
