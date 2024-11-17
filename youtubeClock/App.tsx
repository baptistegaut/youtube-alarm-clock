/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/AccueilScreen';
import EditAlarmScreen from './src/screens/editAlarm';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
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

export default App;
