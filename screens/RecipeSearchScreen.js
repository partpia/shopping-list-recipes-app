import React, { useState, useEffect } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { apikey, appid } from "../apikeys";
import { Button, Title } from "react-native-paper";
import styles from '../AppStyle';

const RecipeSearchScreen = ({ route, navigation }) => {
    const { keyword } = route.params;
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [nextResultsUrl, setNextResultsUrl] = useState('');

    useEffect(() => searchRecipesByKeyword(), [keyword]);

    const searchRecipesByKeyword = () => {
        try {
            fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${keyword}&app_id=${appid}&app_key=${apikey}&mealType=Dinner&field=label&field=image&field=url&field=ingredients&field=mealType`)
                .then(response => response.json())
                .then(data => {
                    setSearchedRecipes(data.hits);
                    setNextResultsUrl(data._links.next.href);
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
        <SafeAreaView style={styles.container}>
            <View style={styles.searchResultText}>
                <Title>You asked for <Text style={styles.keywordStyle}>{keyword}</Text> and we surely do have plenty of delicious recipes for you!</Title>
            </View>
            <View style={styles.searchResultList}>
                <FlatList
                    data={searchedRecipes}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={listSeparator}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Recipe Details', { recipe: item.recipe })}
                            style={{ backgroundColor: index % 2 === 0 ? '#E9DAC4' : '#FBE5C8', alignItems: 'center' }}>
                            <Text style={styles.searcedRecipesListText}>
                                {item.recipe.label}
                            </Text>
                            <Image
                                style={styles.searcedRecipesListImg}
                                source={{ uri: item.recipe.image }}
                            />
                        </TouchableOpacity>}
                />
            </View>
        </SafeAreaView>
    );
}
export default RecipeSearchScreen; 
