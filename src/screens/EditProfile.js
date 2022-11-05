import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Input from '../components/common/Input';
import Toast from 'react-native-toast-message';
import CustomButton from '../components/common/CustomButton';
import {profileApi} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

function EditProfile({navigation}) {
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
  const {t} = useTranslation();

  const validateEmail = value => {
    if (!value) {
      setErrorEmail(t('This field cannot be empty'));
    } else if (value.length < 10) {
      setErrorEmail(t('Email is too short'));
    } else if (value.length > 30) {
      setErrorEmail(t('Email is too long'));
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
  const validateName = value => {
    if (!value) {
      setErrorName(t('This field cannot be empty'));
    } else if (value.length < 10) {
      setErrorName(t('Username is too short'));
    } else if (value.length > 30) {
      setErrorName(t('Username is too long'));
    } else {
      setErrorName('');
      return true;
    }
    return false;
  };

  const validatePass = value => {
    if (value.length < 6 && value.length > 0) {
      setErrorPass(t('Password is too short (at least 6 characters)'));
    } else if (value.length > 20) {
      setErrorPass(t('Password is too long'));
    } else {
      setErrorPass('');
      return true;
    }
    return false;
  };

  const validateCheckPass = value => {
    if (password !== value) {
      setErrorCheckPass(t('The confirm password does not match'));
    } else {
      setErrorCheckPass('');
      return true;
    }
    return false;
  };
  const validatePassCurrent = value => {
    if (!value) {
      setErrorPassCurrent(t('You should type your current password to reset'));
    } else if (value.length < 6) {
      setErrorPassCurrent(t('Password is too short (at least 6 characters)'));
    } else if (value.length > 20) {
      setErrorPassCurrent(t('Password is too long'));
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
        profileApi.getInfoProfile(idUser1).then(res => {
          setEmail(res.data.email);
          setName(res.data.name);
          setIdUser(idUser1);
        });
      }
    });
  }, []);
  const submit = () => {
    setOnSubmit(true);
    const valid1 = validateEmail(email);
    const valid2 = validateName(name);
    const valid3 = validatePass(password);
    const valid4 = validateCheckPass(checkPass);
    const valid5 = validatePassCurrent(passCurrent);
    if (valid1 && valid2 && valid3 && valid4 && valid5) {
      if (password === '') {
        profileApi
          .patchInfoProfile(idUser, {email, name, cr_password: passCurrent})
          .then(res => {
            resultUpdate(res.data);
          });
      } else {
        profileApi
          .patchInfoProfile(idUser, {
            email,
            name,
            password,
            cr_password: passCurrent,
          })
          .then(res => {
            resultUpdate(res.data);
          });
      }
    }
  };

  const resultUpdate = data => {
    if (data.success) {
      Toast.show({
        type: 'successToast',
        text1: t('Update successfully'),
        visibilityTime: 2000,
      });
      navigation.goBack();
    } else {
      if (data.notice) {
        setErrorEmail(t('This email is incorrect'));
      } else setErrorPassCurrent(t('This password is incorrect'));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Input
          title={t('Email')}
          placeholder={t('Email')}
          value={email}
          style={{marginTop: 20}}
          textError={errorEmail}
          error={errorEmail !== ''}
          icon="user"
          onChangeText={value => {
            setEmail(value);
            if (onSubmit) validateEmail(value);
          }}
        />
        <Input
          title={t('Username')}
          placeholder={t('Username')}
          value={name}
          icon="user"
          style={{marginTop: -5}}
          textError={errorName}
          error={errorName !== ''}
          onChangeText={value => {
            setName(value);
            if (onSubmit) validateName(value);
          }}
        />
        <Input
          title={t('New Password')}
          placeholder={t('New Password')}
          value={password}
          textError={errorPass}
          error={errorPass !== ''}
          style={{marginTop: -5}}
          secureTextEntry
          icon="lock"
          onChangeText={value => {
            setPassword(value);
            if (onSubmit) validatePass(value);
          }}
        />
        <Input
          title={t('Confirm New Password')}
          placeholder={t('Confirm New Password')}
          value={checkPass}
          secureTextEntry
          style={{marginTop: -5}}
          textError={errorCheckPass}
          error={errorCheckPass !== ''}
          icon="lock"
          onChangeText={value => {
            setCheckPass(value);
            if (onSubmit) validateCheckPass(value);
          }}
        />
        <Input
          title={t('Current Password')}
          placeholder={t('Current Password')}
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
            textStyles={{color: 'white'}}
            text={t('Save Changes')}
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
