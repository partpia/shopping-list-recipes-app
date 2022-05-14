import React, { useEffect, useState } from "react";
import { ScrollView, View } from 'react-native';
import { Button, FAB, Modal, Portal, RadioButton, TextInput } from 'react-native-paper';
import { auth, db } from "../firebase";
import { addDoc, collection, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import styles from '../AppStyle';
import { showAlert } from "./Alert";

const AddItemToList = (props) => {
    const [newItem, setNewItem] = useState({
        food: '',
        measure: '',
        quantity: '',
        section: ''
    });
    const [newSection, setNewSection] = useState('');
    const [allItems, setAllItems] = useState([]);

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
    // checks section details
    const checkSection = async () => {
        if (newItem.section !== '') {
            saveNewItemWithSection();
        } else {
            if (newSection === '') {
                showAlert("Add section", "Please insert section for new item.");
            } else if (props.sections.length === 0) {
                try {
                    const docRef = await addDoc(collection(db, `sections/${auth.currentUser.uid}/userSections`), {
                        name: newSection
                    })
                    setNewItem({...newItem, section: docRef.id});
                    saveNewItemWithSection();
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    const saveNewItemWithSection = async () => {
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
                    <ScrollView style={styles.addItemView}>
                        <TextInput
                            label="Item"
                            value={newItem.food}
                            onChangeText={text => setNewItem({ ...newItem, food: text })}
                            style={styles.addItemInput}
                        />
                        <TextInput
                            label="Quantity"
                            value={newItem.quantity}
                            onChangeText={text => setNewItem({ ...newItem, quantity: text })}
                            style={styles.addItemInput}
                        />
                        <TextInput
                            label="Measure"
                            value={newItem.measure}
                            onChangeText={text => setNewItem({ ...newItem, measure: text })}
                            style={styles.addItemInput}
                        />
                        <View>
                            <RadioButton.Group onValueChange={section => setNewItem({ ...newItem, section: section })} value={newItem.section}>
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
                            <View style={styles.rowInputAndButton}>
                                <TextInput
                                    label="New section"
                                    value={newSection}
                                    onChangeText={text => setNewSection(text)}
                                    style={styles.addItemInputRow}
                                />
                                <Button
                                    onPress={checkSection}
                                    style={styles.addItemButton}>
                                    Add
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </Portal>
        </View>
    );
}
export default AddItemToList;
