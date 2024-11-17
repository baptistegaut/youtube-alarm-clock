/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Button,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './src/screens/AccueilScreen';
import EditAlarmScreen from './src/screens/editAlarm';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={params => ({
            title: 'Clock Radio',
            headerTitleStyle: {
              color: 'black',
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTransparent: true,
          })}
        />
        <Stack.Screen
          name="Alarm form"
          component={EditAlarmScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  text: {
    color: 'black',
  },
});

export default App;
