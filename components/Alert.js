import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

export const showAlert = (title, msg) => {
    Alert.alert(
        title,
        msg,
        [
            { text: "OK", onPress: () => {} }
        ]
    );
}