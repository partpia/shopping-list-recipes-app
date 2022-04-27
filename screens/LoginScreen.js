import React, { useState, useEffect } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    View
} from 'react-native';
import {
    Button,
    Headline,
    Subheading,
    TextInput }
from "react-native-paper";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import styles from '../AppStyle';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('Home');
            }
        })
        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .catch(error => alert(error.message));
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ImageBackground source={require('../assets/shopbag.jpg')} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.inputContainer}>
                <Headline style={styles.logo}>ShoppingAndRecipes</Headline>
                <Subheading>...to help your everyday tasks!</Subheading>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        mode='outlined'
                        label='Email'
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        mode='outlined'
                        label='Password'
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={handleLogin}
                        icon='login-variant'
                        mode='contained'
                        color='#F6C324'
                        style={styles.button}
                        labelStyle={{ fontSize: 18 }}>
                        Login
                    </Button>
                    <Button
                        onPress={handleSignUp}
                        mode='contained'
                        color='#3AA3A0'
                        style={styles.button}
                        labelStyle={{ fontSize: 18 }}>
                        Register
                    </Button>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}
export default LoginScreen;
