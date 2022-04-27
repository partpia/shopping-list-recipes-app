import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Headline, Title } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Headline>Welcome</Headline>
            <Card
                style={styles.card}
                onPress={() => navigation.navigate('Shopping')}>
                <Card.Content>
                    <Title>Shopping Lists</Title>
                </Card.Content>
                <Card.Cover source={require('../assets/list.jpg')} />
            </Card>
            <Card
                style={styles.card}
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
// TODO: move to AppStyle.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%'
    }
});
