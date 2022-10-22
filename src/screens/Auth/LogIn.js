import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {Dimensions} from 'react-native';

import Input from '../../components/common/Input';
import CustomButton from '../../components/common/CustomButton';
import { AuthApi } from '../../services/api';

function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');

  const validateEmail = (value) => {
    if (!value) {
      setErrorEmail('Trường này không được bỏ trống');
    } else {
      const check = value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (check) {
        setErrorEmail('');
        return true;
      } else setErrorEmail('Email không hợp lệ');
    }

    return false;
  };

  const validatePass = (value) => {
    if (!value) {
      setErrorPass('Trường này không được bỏ trống');
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
      AuthApi.login(email, password)
        .then((res) => {
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
              text1: 'Đăng nhập thành công',
              visibilityTime: 2000,
            });

            // Save to Async Storage
            AsyncStorage.setItem(
              'user',
              JSON.stringify({
                user_id: res.data.user_id,
                email: res.data.email,
                name: res.data.name,
              })
            ).then(() => {
              navigation.replace("Training System")
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
          }}
        >
          <Ionicons name="chevron-back" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Đăng nhập</Text>
        <View style={styles.container}>
          <Input
            title="Email"
            placeholder="Email"
            value={email}
            textError={errorEmail}
            error={errorEmail !== ''}
            icon="user"
            onChangeText={(value) => {
              setEmail(value);
              if (onSubmit) validateEmail(value);
            }}
          />
          <Input
            title="Mật khẩu"
            placeholder="Mật khẩu"
            value={password}
            textError={errorPass}
            error={errorPass !== ''}
            secureTextEntry
            icon="lock"
            onChangeText={(value) => {
              setPassword(value);
              if (onSubmit) validatePass(value);
            }}
          />
          <View style={styles.LogIn}>
            <CustomButton
              buttonStyles={{ backgroundColor: '#000000', width: 300, height: 60, marginTop: 20 }}
              textStyles={{ color: 'white' }}
              text={'Đăng nhập'}
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
