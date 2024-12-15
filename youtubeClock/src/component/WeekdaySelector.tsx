import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

export default function WeekdaySelector({
  selectedWeekdays,
  setSelectedWeekdays,
}) {
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleWeekday = (day: string) => {
    if (selectedWeekdays.includes(day)) {
      setSelectedWeekdays(selectedWeekdays.filter(d => d !== day));
    } else {
      setSelectedWeekdays([...selectedWeekdays, day]);
    }
  };

  return (
    <View style={styles.weekdaySelector}>
      {weekdays.map(day => (
        <Pressable
          key={day}
          onPress={() => toggleWeekday(day)}
          style={[
            styles.weekdayButton,
            selectedWeekdays.includes(day) && styles.selectedWeekdayButton,
          ]}>
          <Text
            style={[
              styles.weekdayText,
              selectedWeekdays.includes(day) && styles.selectedWeekdayText,
            ]}>
            {day}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // ... other styles
  weekdaySelector: {
    magin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  weekdayButton: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  selectedWeekdayButton: {
    backgroundColor: '#00802b',
  },
  weekdayText: {
    color: '#000',
  },
  selectedWeekdayText: {
    color: '#fff',
  },
});
