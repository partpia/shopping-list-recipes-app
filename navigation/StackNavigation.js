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

const Stack = createNativeStackNavigator();

const StackNavigation = () => {

    return (
            <Stack.Navigator
                initialRouteName='Login'
                screenOptions={{
                    header: (props) => <CustomNavigationBar {...props} />,
                }}>
                <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Shopping' component={ShoppingScreen} />
                <Stack.Screen name='Recipes' component={RecipesScreen} />
                <Stack.Screen name='BottomTabs' component={BottomTabNavigator} />
                <Stack.Screen name='Search Recipes' component={RecipeSearchScreen} />
                <Stack.Screen name='Recipe Details' component={RecipeDetailsScreen} />
                <Stack.Screen name='Saved Recipes' component={SavedRecipesScreen} />
            </Stack.Navigator>
    );
}
export default StackNavigation;
