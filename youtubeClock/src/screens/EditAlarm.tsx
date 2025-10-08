import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import WeekdaySelector from '../component/WeekdaySelector';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { TriggerType } from '@notifee/react-native';

export interface Alarm {
  time: string;
  youtubeLink: string;
  weekdays?: string[];
}

function EditAlarmScreen({navigation, route}) {
  const {alarmList, index} = route.params;
  const [date, setDate] = useState(new Date());
  const [youtubeLink, setYoutubeLink] = useState('');
  const ALARM_KEY = 'alarms';
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);

  useEffect(() => {
    if (index !== undefined && alarmList && alarmList[index]) {
      const alarm = alarmList[index];
      setYoutubeLink(alarm.youtubeLink);
      const [hours, minutes] = alarm.time.split(':').map(Number);
      const alarmDate = new Date();
      alarmDate.setHours(hours);
      alarmDate.setMinutes(minutes);
      setDate(alarmDate);
      if (alarm.weekdays) {
        setSelectedWeekdays(alarm.weekdays);
      }
    }
  }, [index, alarmList]);

  const saveAlarm = async () => {
    try {
      const alarm = {
        time: date.getHours() + ':' + date.getMinutes(),
        youtubeLink,
        weekdays: selectedWeekdays,
      };
      if (index !== undefined && alarmList && alarmList[index]) {
        const updatedAlarms = alarmList.map((a: Alarm, i: number) =>
          i === index ? alarm : a,
        );
        await AsyncStorage.setItem(ALARM_KEY, JSON.stringify(updatedAlarms));
        return navigation.navigate('Home');
      }
      await AsyncStorage.setItem(
        ALARM_KEY,
        JSON.stringify([...alarmList, alarm]),
      );
      setAlarm(date);
      console.log('Alarm saved:', alarm);
      return navigation.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  };

  async function createAlarmChannel() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'alarm',
      name: 'Alarm Notifications',
      sound: 'default', // You can specify a custom sound here
    });
    return channelId;
  }

  async function setAlarm(alarmDate: Date) {
    const channelId = await createAlarmChannel(); // Or retrieve an existing channel ID

    await notifee.createTriggerNotification(
      {
        title: 'Alarm!',
        body: 'Time to wake up!',
        android: {
          channelId,
        },
        ios: {
          sound: 'default', // Or a custom sound for iOS
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: alarmDate.getTime(), // Timestamp in milliseconds
      },
    );
    console.log('Alarm set for:', alarmDate);
  }

  return (
    <View style={styles.container}>
      <WeekdaySelector
        selectedWeekdays={selectedWeekdays}
        setSelectedWeekdays={setSelectedWeekdays}
      />
      <Text style={styles.text}>Time</Text>
      <DatePicker mode="time" date={date} onDateChange={setDate} />
      <Text style={styles.text}>Youtube link</Text>
      <TextInput
        value={youtubeLink}
        onChangeText={setYoutubeLink}
        style={styles.text_input}
      />
      <Pressable style={[styles.pressable_style]} onPress={saveAlarm}>
        <Text style={styles.pressable_text}> Save Alarm </Text>
      </Pressable>
      <Pressable
        style={[styles.pressable_style]}
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
    backgroundColor: 'white',
  },
  text_input: {
    margin: 10,
    width: '80%',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: 'white',
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  pressable_text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  pressable_style: {
    margin: 10,
    padding: 5,
    width: '50%',
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 50,
  },
});
export default EditAlarmScreen;
