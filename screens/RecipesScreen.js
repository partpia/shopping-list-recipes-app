import React, { useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    View }
from 'react-native';
import {
    Card,
    Headline,
    IconButton,
    Title,
    TextInput }
from 'react-native-paper';
import styles from '../AppStyle';
import { getCategories } from "../components/RecipeCategories";

const RecipesScreen = ({ navigation }) => {
    const [keyword, setKeyWord] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => fetchCategories(), []);

    const fetchCategories = async () => {
        const categories = await getCategories();
        setCategories(categories);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container} >
            <View style={styles.searchView}>
                <Headline>What do you want to eat next?</Headline>
                <TextInput
                    label='Type here!'
                    value={keyword}
                    onChangeText={text => setKeyWord(text)} />
                <IconButton
                    icon='magnify'
                    color='black'
                    size={28}
                    onPress={() => navigation.navigate('Search Recipes', { keyword: keyword })} />
            </View>
            <View style={styles.categoryCardGroup}>
                <Headline>Categories</Headline>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <Card
                            onPress={() => navigation.navigate('Saved Recipes', { categoryId: item.id })}
                            style={styles.categoryCard}>
                            <Card.Cover source={{ uri: item.img }} />
                            <Card.Content>
                                <Title style={styles.categoryCardText}>{item.category}</Title>
                            </Card.Content>
                        </Card >
                    )}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                />
            </View>
        </KeyboardAvoidingView>
    );

}
export default RecipesScreen;
