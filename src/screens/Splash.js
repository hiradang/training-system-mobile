
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user').then((user) => {
        if (!JSON.parse(user)) navigation.navigate('Start');
        else {
          const data = JSON.parse(user);
        }
      });
    }, 2000);
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.main}>
        <Image style={styles.image} source={require('../../assets/training-icon.png')}></Image>
        <Text style={styles.text}>Training System</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3D67FF',
    flex: 1,
  },
  main: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 48,
    color: '#ffffff',
  },
});
export default Splash;
