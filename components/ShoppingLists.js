import React, { useEffect, useState } from "react";
import { View, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import styles from '../AppStyle';

const ShoppingLists = ({ navigation }) => {
    const [shoppingLists, setShoppingLists] = useState([]);

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
            setShoppingLists(tempLists);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.shoppingListView}>
                <FlatList
                    data={shoppingLists}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.name}
                            titleStyle={{ fontWeight: '700' }}
                            onPress={() => navigation.navigate('Groceries', { listId: item.id })}
                            left={props =>
                                <List.Icon {...props}
                                    icon={item.avatarIcon}
                                    key={item.id}
                                />}
                        />
                    )}>
                </FlatList>
            </View>
        </View>
    );
}
export default ShoppingLists;
