import React, { useState, useEffect } from "react";
import { View } from 'react-native';
import { Avatar, Card, Headline, Title } from 'react-native-paper';
import { auth, db } from "../firebase";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import styles from '../AppStyle';

const HomeScreen = ({ navigation }) => {
    const [avatar, setAvatar] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => getUserDetails(), []);

    const getUserDetails = async () => {
        try {
            const docSnap = await getDoc(doc(db, "profile", auth.currentUser.uid));
            if (docSnap.exists()) {
                setAvatar(docSnap.data().image)
                setUser(docSnap.data().name)
            } else {
                const docSnap = await setDoc(doc(db, "profile", auth.currentUser.uid), {
                    name: '',
                    image: ''
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.homeContainer}>
            <View style={styles.welcomeView}>
                {avatar !== '' ? (
                    <Avatar.Image size={62} source={{ uri: avatar }} />
                ) : (
                    <Avatar.Image size={62} source={require('../assets/icon.png')} />
                )}
                <Headline style={styles.welcomeText}>
                    Welcome {user}!
                </Headline>
            </View>
            <View style={{alignItems:'center'}}>
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
        </View>
    );
}
export default HomeScreen;
