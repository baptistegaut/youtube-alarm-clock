import {Button, StyleSheet, Text, View} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        title="+"
        onPress={() => {
          return navigation.navigate('Alarm form');
        }}
        color="black"
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 120,
    color: 'black',
  },
  text: {
    color: 'black',
  },
  button: {
    borderRadius: 100,
  },
});
export default HomeScreen;
