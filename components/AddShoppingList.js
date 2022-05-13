import React, { useState } from "react";
import {
    Avatar,
    Button,
    Dialog,
    FAB,
    Paragraph,
    Portal,
    RadioButton,
    TextInput
} from 'react-native-paper';
import { View } from 'react-native';
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import styles from '../AppStyle';

const AddShoppingList = () => {
    const [visible, setVisible] = useState(false);
    const [listName, setListName] = useState('');
    const [listIcon, setListIcon] = useState('cart');
    const avatarIcons = ['cart', 'heart', 'medical-bag', 'shovel', 'paw', 'airplane', 'tshirt-crew', 'run-fast'];

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const saveShoppingList = async () => {
        hideDialog();
        try {
            await addDoc(collection(db, `lists/${auth.currentUser.uid}/userLists`), {
                name: listName,
                avatarIcon: listIcon,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Add new shopping list</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label='List name'
                                value={listName}
                                onChangeText={text => setListName(text)}
                                mode='outlined'
                            />
                        </Dialog.Content>
                        <Dialog.Content>
                            <Paragraph style={styles.largerFontSize}>Select image</Paragraph>
                            <RadioButton.Group onValueChange={newValue => setListIcon(newValue)} value={listIcon}>
                                {avatarIcons.map((item, index) => (
                                    <View style={styles.shoppingListIcons}>
                                        <Avatar.Icon
                                            size={42}
                                            icon={item}
                                            key={index}
                                        />
                                        <RadioButton value={item} />
                                    </View>
                                ))}
                            </RadioButton.Group>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Cancel</Button>
                            <Button onPress={() => saveShoppingList()}>Save</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
            <FAB
                style={styles.fabButton}
                icon="plus"
                onPress={() => showDialog()}
            />
        </View>
    );
}
export default AddShoppingList;
