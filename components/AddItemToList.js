import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from 'react-native';
import { Button, FAB, Dialog, Drawer, List, Modal, Paragraph, Portal, RadioButton, TextInput } from 'react-native-paper';
import { auth, db } from "../firebase";
import { collection, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import styles from '../AppStyle';

const AddItemToList = (props) => {
    const [newItem, setNewItem] = useState({
        food: '',
        measure: '',
        quantity: '',
        section: ''
    });
    const [allItems, setAllItems] = useState([]);
    const [showSections, setShowSections] = useState(false);

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const getAllUsersItems = async () => {
        try {
            const docRef = doc(db, "allItems", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setAllItems(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    const saveNewItem = async () => {
        try {
            await updateDoc(doc(db, 'items', props.listId), {
                active: arrayUnion(newItem)
            });
            setNewItem({});
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <FAB
                style={styles.fabAddItem}
                icon="plus"
                onPress={showModal}
            />
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <View>
                        <TextInput
                            label="Item"
                            value={newItem.food}
                            onChangeText={text => setNewItem({ ...newItem, food: text })}
                            style={{ width: '80%' }}
                        />
                        <TextInput
                            label="Quantity"
                            value={newItem.quantity}
                            onChangeText={text => setNewItem({ ...newItem, quantity: text })}
                            style={{ width: '80%' }}
                        />
                        <TextInput
                            label="Measure"
                            value={newItem.measure}
                            onChangeText={text => setNewItem({ ...newItem, measure: text })}
                            style={{ width: '80%' }}
                        />
                        <Button onPress={() => setShowSections(true)}>Add</Button>
                    </View>
                    {showSections && (
                        <RadioButton.Group onValueChange={section => setNewItem({...newItem, section: section})} value={newItem.section}>
                            {props.sections.map((item) => (
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
                        </RadioButton.Group>
                    )}
                    <Button onPress={saveNewItem}>Test</Button>
                </Modal>
            </Portal>
        </View>
    );
}
export default AddItemToList;
