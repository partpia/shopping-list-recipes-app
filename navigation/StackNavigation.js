import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CustomNavigationBar from './CustomNavigationBar';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SavedRecipesScreen from "../screens/SavedRecipesScreen";
import ShoppingScreen from "../screens/ShoppingScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import RecipesScreen from "../screens/RecipesScreen";
import RecipeSearchScreen from "../screens/RecipeSearchScreen";
import ShoppingItemsScreen from "../screens/ShoppingItemsScreen";
import IngredientsToListScreen from "../screens/IngredientsToListScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {

    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                header: (props) => <CustomNavigationBar {...props} />,
            }}>
            <Stack.Screen name='Main' component={HomeScreen} />
            <Stack.Screen name='Home' component={BottomTabNavigator} />
            <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
            <Stack.Screen name='Shopping' component={ShoppingScreen} />
            <Stack.Screen name='Recipes' component={RecipesScreen} />
            <Stack.Screen name='BottomTabs' component={BottomTabNavigator} />
            <Stack.Screen name='Search Recipes' component={RecipeSearchScreen} />
            <Stack.Screen name='Recipe Details' component={RecipeDetailsScreen} />
            <Stack.Screen name='Saved Recipes' component={SavedRecipesScreen} />
            <Stack.Screen name='Groceries' component={ShoppingItemsScreen} />
            <Stack.Screen name='Ingredients' component={IngredientsToListScreen} />
        </Stack.Navigator>
    );
}
export default StackNavigation;
