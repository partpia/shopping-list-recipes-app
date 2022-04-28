import React, { useState, useEffect } from "react";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { apikey, appid } from "../apikeys";
import { Button, Card, IconButton, TextInput, Title } from "react-native-paper";
import styles from '../AppStyle';

const RecipeSearchScreen = ({ route, navigation }) => {
    const { word } = route.params;
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [nextResultsUrl, setNextResultsUrl] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        setKeyword(word);
        searchRecipesByKeyword(word)
    }, [word]);

    const searchRecipesByKeyword = (word) => {
        try {
            fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${word}&app_id=${appid}&app_key=${apikey}&mealType=Dinner&field=label&field=image&field=url&field=ingredients&field=mealType`)
                .then(response => response.json())
                .then(data => {
                    setSearchedRecipes(data.hits);
                    setNextResultsUrl(data._links.next.href);
                    console.log('nyt');
                })
        } catch (error) {
            console.log(error);
        }
    }

    const listSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "#3AA3A0",
                }}
            />
        );
    };
    // onEndReached={loadMore} TODO: not working yet
    const loadMore = () => {
        if (nextResultsUrl != undefined) {
            const tempList = [];
            try {
                fetch(nextResultsUrl)
                    .then(response => response.json())
                    .then(data => {
                        setNextResultsUrl(data._links.next.href);
                        data.hits.forEach(element => {
                            tempList.push(element);
                            console.log(element.recipe.label);
                        });
                    })
                //setSearchedRecipes([...searchedRecipes, tempList]);
            } catch (error) {
                console.log(error);
            }
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
                    ItemSeparatorComponent={listSeparator}
                    renderItem={({ item, index }) =>
                            <FlatList
                                data={searchedRecipes}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item, index }) =>
                                    <Card
                                        onPress={() => navigation.navigate('Recipe Details', { recipe: item.recipe })}
                                        style={{
                                            alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                            width: '60%',
                                            margin: 10,
                                            marginLeft: 60,
                                            marginRight: 60,}}>
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
