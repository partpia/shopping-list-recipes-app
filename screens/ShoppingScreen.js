import React from "react";
import {
    StyleSheet,
    Text,
    View }
from 'react-native';
import ShoppingLists from "../components/ShoppingLists";

const ShoppingScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Coming soon!</Text>
            <ShoppingLists />
        </View>
    );
}
export default ShoppingScreen;
// TODO: move to AppStyle.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
