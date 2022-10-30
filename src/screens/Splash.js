import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from 'react-redux';
import {setUserId} from '../redux/actions';

function Splash({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user').then(user => {
        const userObject = JSON.parse(user);
        if (!userObject) navigation.replace('Start');
        else {
          dispatch(setUserId(userObject.user_id));
          navigation.replace('Training System');
        }
      });
    }, 2000);
  }, []);
  return (
    <View style={styles.body}>
      <View style={styles.main}>
        <Image
          style={styles.image}
          source={require('../../assets/img/training-icon.png')}
        />
        <Text style={styles.text}>Training System</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#5F7FEF',
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
