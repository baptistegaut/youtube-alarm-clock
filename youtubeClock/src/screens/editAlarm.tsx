import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface Alarm {
  time: string;
  channelId: string;
}

function EditAlarmScreen({navigation, route}) {

  const { alarmList } = route.params;
  const [date, setDate] = useState(new Date());
  const [channelId, setChannelId] = useState('');
  const deviceWidth = useWindowDimensions().width;
  const ALARM_KEY = 'alarms';

  const saveAlarm = async () => {
    try {
      const alarm = { time: date.getHours() + ':' + date.getMinutes(), channelId: channelId };
      await AsyncStorage.setItem(ALARM_KEY, JSON.stringify([...alarmList, alarm]));
      return navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Time</Text>
      <DatePicker theme="dark" mode="time" date={date} onDateChange={setDate} />
      <Text style={styles.text}>Youtube channel </Text>
      <TextInput
        value={channelId} onChangeText={setChannelId}
        style={[styles.text_input, {width: deviceWidth - deviceWidth / 2}]}
      />
      <Pressable
        style={[
          styles.pressable_style,
          {width: deviceWidth - deviceWidth / 1.5},
        ]}
        onPress={saveAlarm}>
        <Text style={styles.pressable_text}> Add alarm </Text>
      </Pressable>
      <Pressable
        style={[
          styles.pressable_style,
          {width: deviceWidth - deviceWidth / 1.5},
        ]}
        onPress={() => {
          return navigation.navigate('Home');
        }}>
        <Text style={styles.pressable_text}> Cancel </Text>
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
    color: 'white',
  },
  pressable_text: {
    color: 'black',
    fontSize: 20,
  },
  pressable_style: {
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
  },
});
export default EditAlarmScreen;
