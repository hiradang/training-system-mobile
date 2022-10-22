import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Input from '../components/common/Input';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/common/CustomButton';
import { profileApi } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EditProfile({ navigation }) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [passCurrent, setPassCurrent] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [errorCheckPass, setErrorCheckPass] = useState('');
  const [errorPassCurrent, setErrorPassCurrent] = useState('');
  const [idUser, setIdUser] = useState('');

  const validateEmail = (value) => {
    if (!value) {
      setErrorEmail('Trường này không được bỏ trống');
    } else if (value.length < 10) {
      setErrorEmail('Email quá ngắn');
    } else if (value.length > 30) {
      setErrorEmail('Email quá dài');
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
  const validateName = value => {
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

  const validatePass = value => {
    if (value.length < 6 && value.length > 0) {
      setErrorPass('Mật khẩu quá ngắn(tối thiểu 6 kí tự)');
    } else if (value.length > 20) {
      setErrorPass('Mật khẩu quá dài');
    } else {
      setErrorPass('');
      return true;
    }
    return false;
  };

  const validateCheckPass = value => {
    if (password !== value) {
      setErrorCheckPass('Mật khẩu xác nhận không trùng khớp');
    } else {
      setErrorCheckPass('');
      return true;
    }
    return false;
  };
  const validatePassCurrent = value => {
    if (!value) {
      setErrorPassCurrent('Bạn cần nhập mật khẩu để thay đổi');
    } else if (value.length < 6) {
      setErrorPassCurrent('Mật khẩu quá ngắn(tối thiểu 6 kí tự)');
    } else if (value.length > 20) {
      setErrorPassCurrent('Mật khẩu quá dài');
    } else {
      setErrorPassCurrent('');
      return true;
    }
    return false;
  };
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (JSON.parse(user)) {
        let idUser1 = JSON.parse(user).user_id;
        profileApi.getInfoProfile(idUser1).then((res) => {
          setEmail(res.data.email);
          setName(res.data.name);
          setIdUser(idUser1)
        })
      }
    })

  }, [])
  const submit = () => {
    setOnSubmit(true);
    const valid1 = validateEmail(email);
    const valid2 = validateName(name);
    const valid3 = validatePass(password);
    const valid4 = validateCheckPass(checkPass);
    const valid5 = validatePassCurrent(passCurrent);
    if (valid1 && valid2 && valid3 && valid4 && valid5) {
      if (password === '') {
        profileApi.patchInfoProfile(idUser, { email, name, cr_password: passCurrent }).then(res => {
          resultUpdate(res.data)
        })
      } else {
        profileApi.patchInfoProfile(idUser, { email, name, password, cr_password: passCurrent }).then(res => {
          resultUpdate(res.data)
        })
      }
    }
  };

  const resultUpdate = (data) => {
    if (data.success) {
      Toast.show({
        type: 'successToast',
        text1: 'Chỉnh sửa thành công',
        visibilityTime: 2000,
      });
      navigation.goBack()
    } else {
      if (data.notice) {
        setErrorEmail("Email đã tồn tại")
      } else setErrorPassCurrent("Mật khẩu không chính xác")
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>

        <Input
          title="Email"
          placeholder="Email"
          value={email}
          style={{ marginTop: 20 }}
          textError={errorEmail}
          error={errorEmail !== ''}
          icon="user"
          onChangeText={value => {
            setEmail(value);
            if (onSubmit) validateEmail(value);
          }}
        />
        <Input
          title="Tên người dùng"
          placeholder="Tên người dùng"
          value={name}
          icon="user"
          style={{ marginTop: -5 }}
          textError={errorName}
          error={errorName !== ''}
          onChangeText={value => {
            setName(value);
            if (onSubmit) validateName(value);
          }}
        />
        <Input
          title="Mật khẩu"
          placeholder="Mật khẩu"
          value={password}
          textError={errorPass}
          error={errorPass !== ''}
          style={{ marginTop: -5 }}
          secureTextEntry
          icon="lock"
          onChangeText={value => {
            setPassword(value);
            if (onSubmit) validatePass(value);
          }}
        />
        <Input
          title="Xác nhận mật khẩu mới"
          placeholder="Mật khẩu"
          value={checkPass}
          secureTextEntry
          style={{ marginTop: -5 }}
          textError={errorCheckPass}
          error={errorCheckPass !== ''}
          icon="lock"
          onChangeText={value => {
            setCheckPass(value);
            if (onSubmit) validateCheckPass(value);
          }}
        />
        <Input
          title="Mật khẩu hiện tại"
          placeholder="Mật khẩu"
          value={passCurrent}
          secureTextEntry
          textError={errorPassCurrent}
          error={errorPassCurrent !== ''}
          icon="lock"
          onChangeText={value => {
            setPassCurrent(value);
            if (onSubmit) validatePassCurrent(value);
          }}
        />
        <View style={styles.saveButton}>
          <CustomButton
            buttonStyles={{
              backgroundColor: '#000000',
              width: 350,
              height: 60,
              marginTop: 10,
            }}
            textStyles={{ color: 'white' }}
            text={'Lưu thay đổi'}
            onPressFunc={submit}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D67FF',
    height: '100%',
    textAlign: 'center',
  },
  imageContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
    marginBottom: 50,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,

    borderWidth: 1,
    borderColor: '#CCD4F3',
  },
  editIconContainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -16,
    top: 50,
  },
  row: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    fontSize: 20,
    borderRadius: 20,
    paddingHorizontal: 60,
  },
  saveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EditProfile;
