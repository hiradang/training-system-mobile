import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import Splash from './screens/Splash';
import Start from './screens/Start';
import SignUp from './screens/Auth/SignUp';
import LogIn from './screens/Auth/LogIn';
import Home from './screens/Home';
import ListExam from './screens/ListExam';
import Setting from './screens/Setting';
import ExamHistory from './screens/ExamHistory';
import JoinExam from './screens/JoinExam';
import EditProfile from './screens/EditProfile';
import DoExam from './screens/DoExam';

import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

const toastConfig = {
  successToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 5,
        borderLeftColor: '#4BB543',
        borderLeftWidth: 8,
        elevation: 2,
      }}>
      <AntDesign
        name="checkcircleo"
        size={24}
        color="#4BB543"
        style={{ marginHorizontal: 12 }}
      />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#4BB543' }}>
        {text1}
      </Text>
    </View>
  ),

  errorToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 5,
        borderLeftColor: '#ff3333',
        borderLeftWidth: 8,
        elevation: 2,
      }}>
      <AntDesign
        name="closecircleo"
        size={24}
        color="#ff3333"
        style={{ marginHorizontal: 12 }}
      />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#ff3333' }}>
        {text1}
      </Text>
    </View>
  ),

  disableToast: ({ text1 }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        width: '90%',
        backgroundColor: 'white',

        borderRadius: 5,
        borderLeftColor: '#cccccc',
        borderLeftWidth: 8,
        elevation: 2,
      }}>
      <MaterialIcons
        name="do-not-touch"
        size={24}
        color="#cccccc"
        style={{ marginHorizontal: 12 }}
      />
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#cccccc' }}>
        {text1}
      </Text>
    </View>
  ),
};

const App = () => {
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      axios.interceptors.request.use(config => {
        config.headers.authorization = JSON.parse(user);
        return config;
      });
    });
  }, []);

  const { t } = useTranslation();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Start"
            component={Start}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LogIn}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Training System"
            component={Home}
            options={({ navigation }) => ({
              headerShown: true,
              title: t('App Title'),
              headerRight: () => (
                <AntDesign
                  name="setting"
                  size={30}
                  style={{ marginRight: 20 }}
                  color="black"
                  onPress={() => {
                    navigation.navigate('Setting');
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="ListExam"
            component={ListExam}
            options={({route}) => ({
              headerShown: true,
              title: route.params.title,
              upperCaseLabel: true,
              headerTitleStyle: {
                textTransform: 'capitalize',
              },
            })}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              headerShown: true,
              title: t('Setting'),
            }}
          />
          <Stack.Screen
            name="ExamHistory"
            component={ExamHistory}
            options={({ route }) => ({
              headerShown: true,
              title: route.params.title,
              headerTitleStyle: {
                textTransform: 'capitalize',
              },
            })}
          />
          <Stack.Screen
            name="JoinExam"
            component={JoinExam}
            options={({ route }) => ({
              headerShown: true,
              title: route.params.title,
              headerTitleStyle: {
                textTransform: 'capitalize',
              },
            })}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: true,
              title: t('Edit Profile'),
            }}
          />
          <Stack.Screen
            name="DoExam"
            component={DoExam}
            options={({ navigation, route }) => ({
              headerShown: true,
              headerLeft: () => (
                <AntDesign name="arrowleft" size={25} color="#000000" style= {{marginLeft: 10}} onPress={() =>
                  navigation.replace("ListExam", {
                    reload: true,
                    subject: route.params.subject,
                    title: route.params.subject.name,
                    userId: route.params.userId,
                  })} />
              ),
              title: route.params.title,
              headerTitleStyle: {
                textTransform: 'capitalize',
              },
            })}
          />
        </Stack.Navigator>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
