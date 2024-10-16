/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  Text,
  Button
} from 'react-native';
import {
  NavigationContainer,
} from '@react-navigation/native';

import YoutubePlayer from 'react-native-youtube-iframe';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

function HomeScreen() {

  const [playing, setPlaying] = useState(false);
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  }


    return (
      <View>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={'Nx9E6QK3-jI'}
        />
        <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
      </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
container: {

}
});

export default App;
