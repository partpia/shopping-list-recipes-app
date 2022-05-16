import React, { useState } from "react";
import { ScrollView, View } from 'react-native';
import { Button, FAB, Modal, Portal, RadioButton, Text, TextInput } from 'react-native-paper';
import { auth, db } from "../firebase";
import { addDoc, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { showAlert } from "./Alert";
import { showToast } from "./Toast";
import styles from '../AppStyle';

const AddItemToList = (props) => {
    const [newItem, setNewItem] = useState({
        food: '',
        measure: '',
        quantity: ''
    });
    const [section, setSection] = useState('');
    const [newSection, setNewSection] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    // checks section details
    const checkSection = async () => {
        if (newSection === '' && section === '') {
            showAlert("Add section", "Please select section!");
        } else if (showInput) {
            try {
                const docRef = await addDoc(collection(db, `sections/${auth.currentUser.uid}/userSections`), {
                    name: newSection
                })
                saveNewItemWithSection(docRef.id);
            } catch (error) {
                showToast('Failed to save section')
            }
        } else {
            saveNewItemWithSection(section);
        }
    }
    // saves new item with selected section
    const saveNewItemWithSection = async (section) => {
        try {
            await updateDoc(doc(db, 'items', props.listId), {
                active: arrayUnion({
                    food: newItem.food,
                    measure: newItem.measure,
                    quantity: newItem.quantity,
                    section: section
                })
            });
            props.getShoppingListItems();
            setNewItem({
                food: '',
                measure: '',
                quantity: ''
            });
            setNewSection('');
            showToast('Item saved')
        } catch (error) {
            showToast('Failed to save item')
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
                        <Text style={styles.addItemTxt}>
                            ADD ITEM DETAILS
                        </Text>
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
                            <Text style={styles.addItemTxt}>
                                SELECT SECTION
                            </Text>
                            <RadioButton.Group onValueChange={newValue => setSection(newValue)} value={section}>
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
                            <RadioButton.Group onValueChange={() => setShowInput(true)}>
                                <RadioButton.Item
                                    key='New section'
                                    label='New section'
                                    value='New section'
                                    labelStyle={{
                                        fontSize: 18,
                                        textTransform: 'capitalize',
                                    }}
                                />
                            </RadioButton.Group>
                            {showInput && (
                                <TextInput
                                    label="New section"
                                    value={newSection}
                                    onChangeText={text => setNewSection(text)}
                                    style={styles.addItemInput}
                                />
                            )}
                            <Button
                                onPress={checkSection}
                                mode='contained'
                                style={styles.addItemButton}>
                                Add to list
                            </Button>
                        </View>
                    </ScrollView>
                </Modal>
            </Portal>
        </View>
    );
}
export default AddItemToList;
