import React, { useState } from "react";
import { Appbar, Menu } from 'react-native-paper';
import { View } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const CustomNavigationBar = ({ navigation, back }) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <Appbar.Header style={{ backgroundColor: '#98D7C2' }} >
                {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
                <Appbar.Content />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon='dots-vertical' onPress={openMenu} />}>
                    <Menu.Item onPress={handleSignOut} title="Sign out" icon='logout-variant' />
                </Menu>
            </Appbar.Header>
        </View>
    );
}
export default CustomNavigationBar;
