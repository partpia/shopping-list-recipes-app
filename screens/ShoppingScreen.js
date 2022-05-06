import React from "react";
import { View } from 'react-native';
import AddShoppingList from "../components/AddShoppingList";
import ShoppingLists from "../components/ShoppingLists";
import styles from '../AppStyle';

const ShoppingScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ShoppingLists navigation={navigation} />
            <AddShoppingList />
        </View>
    );
}
export default ShoppingScreen;
