import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from 'react-native';
import {
    Button,
    Headline,
    TextInput,
} from 'react-native-paper';
import styles from '../AppStyle';
import { auth, db } from "../firebase";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import SelectImage from "../components/SelectImage";

const ProfileScreen = () => {
    const [profile, setProfile] = useState({
        name: '',
        image: ''
    })
    const [noProfile, setNoProfile] = useState(false);
    const profileRef = doc(db, "profile", auth.currentUser.uid);

    useEffect(() => getProfile(), []);

    // gets profile details
    const getProfile = async () => {
        try {
            const docSnap = await getDoc(profileRef);
            if (docSnap.exists()) {
                setProfile({
                    name: docSnap.data().name,
                    image: docSnap.data().image,
                })
            } else {
                setNoProfile(true);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // save profile details
    const saveProfile = async () => {
        try {
            await setDoc((profileRef), {
                name: profile.name
            });
        } catch (error) {
            console.log(error)
        }
    }
    // update profile details
    const updateProfile = async () => {
        try {
            await updateDoc(profileRef, {
                name: profile.name
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.profileContainer}>
            <SelectImage imageUrl={profile.image} />
            <KeyboardAvoidingView style={styles.profileDetails}>
                <Headline style={styles.welcomeText}>Hello {profile.name}!</Headline>
                <TextInput
                    label="Name"
                    value={profile.name}
                    onChangeText={text => setProfile({ ...profile, name: text })}
                    style={styles.addItemInput}
                />
                {noProfile ? (
                    <Button
                        mode="contained"
                        onPress={() => saveProfile()}
                        style={styles.addItemButton}>
                        Save
                    </Button>
                ) : (
                    <Button
                        mode="contained"
                        onPress={() => updateProfile()}
                        style={styles.addItemButton}>
                        Update
                    </Button>
                )}
            </KeyboardAvoidingView>
        </View>
    );

}
export default ProfileScreen;
