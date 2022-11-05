import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useDispatch} from 'react-redux';
import {setUserId} from '../../redux/actions';

import Input from '../../components/common/Input';
import CustomButton from '../../components/common/CustomButton';
import {AuthApi} from '../../services/api';

function LogIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const validateEmail = value => {
    if (!value) {
      setErrorEmail(t('This field cannot be empty'));
    } else {
      const check = value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
      if (check) {
        setErrorEmail('');
        return true;
      } else setErrorEmail(t('Email is invalid'));
    }

    return false;
  };

  const validatePass = value => {
    if (!value) {
      setErrorPass(t('This field cannot be empty'));
    } else {
      setErrorPass('');
      return true;
    }
    return false;
  };

  const submit = () => {
    setOnSubmit(true);
    const valid1 = validateEmail(email);
    const valid2 = validatePass(password);
    if (valid1 && valid2) {
      AuthApi.login(email, password).then(res => {
        if (res.data.notice) {
          Toast.show({
            type: 'errorToast',
            text1: res.data.notice,
            visibilityTime: 2000,
          });
          //   setErrorText(true);
        } else {
          Toast.show({
            type: 'successToast',
            text1: t('Login Successfully'),
            visibilityTime: 2000,
          });

          // Save to redux
          dispatch(setUserId(res.data.user_id));

          // Save to Async Storage
          AsyncStorage.setItem(
            'user',
            JSON.stringify({
              user_id: res.data.user_id,
              email: res.data.email,
              name: res.data.name,
            }),
          ).then(() => {
            navigation.replace('Training System');
          });
        }
      });
    }
  };
  return (
    <View style={styles.body}>
      <ScrollView>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>{t('Log In')}</Text>
        <View style={styles.container}>
          <Input
            title={t('Email')}
            placeholder={t('Email')}
            value={email}
            textError={errorEmail}
            error={errorEmail !== ''}
            icon="user"
            onChangeText={value => {
              setEmail(value);
              if (onSubmit) validateEmail(value);
            }}
          />
          <Input
            title={t('Password')}
            placeholder={t('Password')}
            value={password}
            textError={errorPass}
            error={errorPass !== ''}
            secureTextEntry
            icon="lock"
            onChangeText={value => {
              setPassword(value);
              if (onSubmit) validatePass(value);
            }}
          />
          <View style={styles.LogIn}>
            <CustomButton
              buttonStyles={{
                backgroundColor: '#000000',
                width: 300,
                height: 60,
                marginTop: 20,
              }}
              textStyles={{color: 'white'}}
              text={t('Log In')}
              onPressFunc={submit}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3D67FF',
    flex: 1,
  },
  back: {
    marginLeft: 20,
    marginTop: Dimensions.get('window').height * 0.05,
  },
  text: {
    fontSize: 32,
    color: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: Dimensions.get('window').height * 0.15,
    fontWeight: '500',
  },
  container: {
    // marginTop: Dimensions.get('window').height * 0.05,
  },
  LogIn: {
    marginTop: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default LogIn;
