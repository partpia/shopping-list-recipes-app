import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, Colors } from 'react-native-paper';
import { Image, View, Platform } from 'react-native';
import { storage, auth, db } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import styles from '../AppStyle';

const SelectImage = (props) => {
    const [url, setUrl] = useState('');
    const [downloading, setDownloading] = useState(false);
    const profileImageRef = doc(db, "profile", auth.currentUser.uid);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera permissions to make this work!');
                }
            }
        })();
    }, [])
    useEffect(() => setUrl(props.imageUrl), [props.imageUrl]);

    // select image from phone
    const pickImage = async () => {
        setDownloading(true);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        (!result.cancelled) ? saveImage(result.uri) : setDownloading(false);
    };
    // save image to Firebase storage
    const saveImage = async (uri) => {
        try {
            const storageRef = ref(storage, `/images/${auth.currentUser.uid}`)
            const img = await fetch(uri);
            const bytes = await img.blob();
            const uploadTask = uploadBytesResumable(storageRef, bytes);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
                (error) => {
                    console.error(error)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData(downloadURL)
                    });
                })
        } catch (error) {
            setDownloading(false);
            console.log(error)
        }
    }
    // save image url to Firestore
    const setData = async (url) => {
        try {
            await updateDoc(profileImageRef, { image: url });
            setUrl(url);
        } catch (error) {
            console.log(error)
        }
        setDownloading(false);
    }

    return (
        <View style={styles.imageContainer}>
            {url === undefined || url === '' ? (
                <Image source={require('../assets/splash.png')} style={{ width: 300, height: 300 }} />
            ) : (
                <Image source={{ uri: url }} style={{ width: 300, height: 300 }} />
            )}
            <ActivityIndicator animating={downloading} color={Colors.green800} />
            <Button
                onPress={pickImage}
                mode="contained"
                style={styles.addItemButton}>
                Pick an image
            </Button>
        </View>
    );
}
export default SelectImage;
