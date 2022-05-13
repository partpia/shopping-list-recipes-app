import React, { useEffect, useState } from "react";
import { View, FlatList } from 'react-native';
import { Headline, List, Subheading } from 'react-native-paper';
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import styles from '../AppStyle';

const ShoppingLists = ({ navigation }) => {
    const [shoppingLists, setShoppingLists] = useState([]);
    const [noList, setNoList] = useState(false);

    useEffect(() => {
        getShoppingLists();
    }, []);

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
                            key={item.id}
                            left={props =>
                                <List.Icon {...props}
                                    icon={item.avatarIcon}
                                    key={index}
                                />}
                        />
                    )}
                    keyExtractor={(item, index) => index}>
                </FlatList>)
            }
        </View>
    );
}
export default ShoppingLists;
