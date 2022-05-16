import React, { useState, useEffect } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Text,
    View
} from 'react-native';
import { apikey, appid } from "../apikeys";
import { Card, IconButton, TextInput, Title } from "react-native-paper";
import styles from '../AppStyle';

const RecipeSearchScreen = ({ route, navigation }) => {
    const { word } = route.params;
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        setKeyword(word);
        //searchRecipesByKeyword(word)
    }, [word]);

    // fetches recipes by keyword from Edamam recipe API (https://developer.edamam.com/edamam-recipe-api)
    const searchRecipesByKeyword = (word) => {
        try {
            fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${word}&app_id=${appid}&app_key=${apikey}&mealType=Dinner&field=label&field=image&field=url&field=ingredients&field=mealType`)
                .then(response => response.json())
                .then(data => {
                    setSearchedRecipes(data.hits);
                    console.log('nyt');
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <View style={styles.searchResultText}>
                <Title style={styles.textCentered}>You asked for <Text style={styles.keywordStyle}>{keyword}</Text> and we surely do have plenty of delicious recipes for you!</Title>
                <View style={styles.rowView}>
                    <TextInput
                        label='Find more'
                        mode='outlined'
                        value={keyword}
                        onChangeText={text => setKeyword(text)}
                        style={styles.searchTextInput}
                    />
                    <IconButton
                        icon='magnify'
                        color='black'
                        size={34}
                        onPress={() => searchRecipesByKeyword(keyword)}
                        style={styles.itemCentered} />
                </View>
            </View>
            <View style={styles.searchResultList}>
                <FlatList
                    data={searchedRecipes}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) =>
                            <FlatList
                                data={searchedRecipes}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) =>
                                    <Card
                                        onPress={() => navigation.navigate('Recipe Details', { recipe: item.recipe })}
                                        style={styles.searchedRecipesCardList}>
                                        <Card.Cover source={{ uri: item.recipe.image }} />
                                        <Card.Title title={item.recipe.label} />
                                    </Card>}
                            /> }
                />
            </View>
        </KeyboardAvoidingView>
    );
}
export default RecipeSearchScreen; 
