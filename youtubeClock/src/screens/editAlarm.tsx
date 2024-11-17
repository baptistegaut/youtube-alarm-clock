import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  Dimensions,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EditAlarmScreen() {
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [channels, setChannels] = useState('');
  const deviceWidth = useWindowDimensions().width;

  const storeAlarm = async value => {
    const key = 'alarm/' + value;
    console.log('VALUE DE LA KEY', key);
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.storeAlarm('value2');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  const getAllkeys = async () => {
    const allkeys = await AsyncStorage.getAllKeys();
    console.log(allkeys);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Time</Text>
      <DatePicker theme="dark" mode="time" date={date} onDateChange={setDate} />
      <Text> Chose your favorite channel </Text>
      <TextInput
        style={[styles.text_input, {width: deviceWidth - deviceWidth / 2}]}
        onChangeText={setChannels}
      />
      <Pressable
        style={[
          styles.pressable_style,
          {width: deviceWidth - deviceWidth / 1.5},
        ]}
        onPress={async () => {
          await storeAlarm(date.toString());
          Alert.alert(`You add the alarm ${date.toString()}`);
        }}>
        <Text style={styles.pressable_text}> Add </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text_input: {
    margin: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: 'white',
    color: 'black',
  },
  text: {
    fontSize: 20,
  },
  pressable_text: {
    color: 'black',
    fontSize: 20,
  },
  pressable_style: {
    margin: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
    borderRadius: 15,
  },
});
export default EditAlarmScreen;
