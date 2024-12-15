import {Pressable, StyleSheet, View, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NotificationButton} from '../component/Notification';
import {Alarm} from './EditAlarm';

function HomeScreen({navigation}) {
  const ALARM_KEY = 'alarms';
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const getStoredAlarms = async () => {
    try {
      const storedAlarms = await AsyncStorage.getItem(ALARM_KEY);
      if (storedAlarms !== null) {
        setAlarmList(JSON.parse(storedAlarms));
        console.log('storedAlarms', storedAlarms);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAlarm = async (index: number) => {
    const updatedAlarms = alarmList.filter((_, i) => i !== index);
    setAlarmList(updatedAlarms);
    await AsyncStorage.setItem(ALARM_KEY, JSON.stringify(updatedAlarms));
  };

  useFocusEffect(
    React.useCallback(() => {
      getStoredAlarms();
      return () => {};
    }, []),
  );

  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <View style={styles.rowItems}>
        <Text style={styles.time}>{item.time}</Text>
        <Pressable
          onPress={() => deleteAlarm(index)}
          style={styles.deleteButton}>
          <Icon name="delete" size={24} color="#990000" />
        </Pressable>
      </View>
      <View style={styles.rowItems}>
        <Text style={styles.channelId}>{item.channelId}</Text>
        <Text style={styles.channelId}>{item.weekdays?.join(', ')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alarmList}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.buttonView}>
        <Pressable
          onPress={() => {
            return navigation.navigate('Alarm form', {alarmList: alarmList});
          }}
          style={styles.pressable_style}>
          <Text style={styles.pressable_text}>Add Alarm</Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            await AsyncStorage.removeItem(ALARM_KEY);
            setAlarmList([]);
          }}
          style={styles.pressable_style}>
          <Text style={styles.pressable_text}>Clear All</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },

  pressable_style: {
    margin: 10,
    borderRadius: 50,
    padding: 5,
    width: '50%',
    backgroundColor: 'black',
  },
  pressable_text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 5,
    marginVertical: 50,
  },

  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  channelId: {
    fontSize: 16,
    color: '#666',
  },
});
export default HomeScreen;
