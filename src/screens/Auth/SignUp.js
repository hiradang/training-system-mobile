import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import Input from '../../utils/Input';
import CustomButton from '../../utils/CustomButton';

function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [errorCheckPass, setErrorCheckPass] = useState('');

  const validateEmail = (value) => {
    if (!value) {
      setErrorEmail('Trường này không được bỏ trống');
    } else if (value.length < 10) {
      setErrorEmail('Email quá ngắn');
    } else if (value.length > 30) {
      setErrorEmail('Email quá dài');
    } else {
      setErrorEmail('');
      return true;
    }

    return false;
  };
  const validateName = (value) => {
    if (!value) {
      setErrorName('Trường này không được bỏ trống');
    } else if (value.length < 10) {
      setErrorName('Tên người dùng quá ngắn');
    } else if (value.length > 30) {
      setErrorName('Tên người dùng quá dài');
    } else {
      setErrorName('');
      return true;
    }
    return false;
  };

  const validatePass = (value) => {
    if (!value) {
      setErrorPass('Trường này không được bỏ trống');
    } else if (value.length < 6) {
      setErrorPass('Mật khẩu quá ngắn(tối thiểu 6 kí tự)');
    } else if (value.length > 20) {
      setErrorName('Mật khẩu quá dài');
    } else {
      setErrorPass('');
      return true;
    }
    return false;
  };

  const validateCheckPass = (value) => {
    if (!value) {
      setErrorCheckPass('Trường này không được bỏ trống');
    } else if (password !== value) {
      setErrorCheckPass('Mật khẩu xác nhận không trùng khớp');
    } else {
      setErrorCheckPass('');
      return true;
    }
    return false;
  };

  const submit = () => {
    setOnSubmit(true);
    const valid1 = validateEmail(email);
    const valid2 = validateName(name);
    const valid3 = validatePass(password);
    const valid4 = validateCheckPass(checkPass);
    if (valid1 && valid2 && valid3 && valid4) {
      axios
        .post(`https://training-system.aqaurius6666.space/en/api/users`, {
          name,
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.email) {
            Toast.show({
              type: 'errorToast',
              text1: 'Email đã tồn tại',
              visibilityTime: 2000,
            });
            setErrorEmail('Email đã tồn tại');
          } else {
            Toast.show({
              type: 'successToast',
              text1: 'Đăng ký thành công',
              visibilityTime: 2000,
            });
            // navigation.navigate('Login');
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
          <Ionicons name="chevron-back" size={25} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.text}>Đăng ký </Text>
        <Input
          title="Email"
          placeholder="Email"
          value={email}
          type
          textError={errorEmail}
          error={errorEmail !== ''}
          icon="user"
          onChangeText={(value) => {
            setEmail(value);
            if (onSubmit) validateEmail(value);
          }}
        />
        <Input
          title="Tên người dùng"
          placeholder="Tên người dùng"
          value={name}
          icon="user"
          textError={errorName}
          error={errorName !== ''}
          onChangeText={(value) => {
            setName(value);
            if (onSubmit) validateName(value);
          }}
        />
        <Input
          title="Mật khẩu"
          placeholder="Mật khẩu"
          titleInfo="(tối thiểu 6 kí tự)"
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
        <Input
          title="Xác nhận mật khẩu"
          placeholder="Mật khẩu"
          value={checkPass}
          secureTextEntry
          textError={errorCheckPass}
          error={errorCheckPass !== ''}
          icon="lock"
          onChangeText={(value) => {
            setCheckPass(value);
            if (onSubmit) validateCheckPass(value);
          }}
        />
        <View style={styles.signup}>
          <CustomButton
            buttonStyles={{ backgroundColor: '#000000', width: '60%', height: 60, marginTop: 20 }}
            textStyles={{ color: 'white' }}
            text={'Đăng ký'}
            onPressFunc={submit}
          />
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
    marginBottom: Dimensions.get('window').height * 0.05,
    fontWeight: '500',
  },
  signup: {
    marginTop: Dimensions.get('window').height * 0.01,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default SignUp;
