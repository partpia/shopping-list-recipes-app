import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import StackNavigation from './navigation/StackNavigation';

LogBox.ignoreLogs(
  [
    'AsyncStorage',
    'Setting a timer'
  ])

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer styles={styles}>
        <StackNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

