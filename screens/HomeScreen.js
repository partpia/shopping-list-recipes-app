import React from "react";
import { View } from 'react-native';
import { Card, Headline, Title } from 'react-native-paper';
import styles from '../AppStyle';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.homeContainer}>
            <Headline style={styles.welcomeText}>Welcome</Headline>
            <Card
                style={styles.homeCards}
                onPress={() => navigation.navigate('Shopping')}>
                <Card.Content>
                    <Title>Shopping Lists</Title>
                </Card.Content>
                <Card.Cover source={require('../assets/list.jpg')} />
            </Card>
            <Card
                style={styles.homeCards}
                onPress={() => navigation.navigate('Recipes')}>
                <Card.Content>
                    <Title>Recipes</Title>
                </Card.Content>
                <Card.Cover source={require('../assets/spoons.jpg')} />
            </Card>
        </View>
    );
}
export default HomeScreen;
