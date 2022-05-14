import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import ShoppingScreen from "../screens/ShoppingScreen";
import RecipesScreen from "../screens/RecipesScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeTab') {
                        iconName = 'home-outline';
                    } else if (route.name === 'ShoppingTab') {
                        iconName = 'receipt-outline';
                    } else if (route.name == 'RecipesTab') {
                        iconName= 'restaurant-outline';
                    }
                    return <Ionicons name={iconName} size={size} color='#107869' />;
                },
            })}>
            <Tab.Screen name="HomeTab" component={HomeScreen} options={{ headerShown: false, tabBarShowLabel: false }} />
            <Tab.Screen name="ShoppingTab" component={ShoppingScreen} options={{ headerShown: false, tabBarShowLabel: false }} />
            <Tab.Screen name="RecipesTab" component={RecipesScreen} options={{ headerShown: false, tabBarShowLabel: false }} />
        </Tab.Navigator>
    );

}
export default BottomTabNavigator;
