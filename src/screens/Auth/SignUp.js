import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import Input from '../../components/common/Input';
import CustomButton from '../../components/common/CustomButton';
import {AuthApi} from '../../services/api';
import {useTranslation} from 'react-i18next';

function SignUp({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [errorCheckPass, setErrorCheckPass] = useState('');
  const {t} = useTranslation();

  const validateEmail = value => {
    if (!value) {
      setErrorEmail(t('This field cannot be empty'));
    } else if (value.length < 6) {
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
    } else if (value.length < 6) {
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
    if (!value) {
      setErrorPass(t('This field cannot be empty'));
    } else if (value.length < 6) {
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
    if (!value) {
      setErrorCheckPass(t('This field cannot be empty'));
    } else if (password !== value) {
      setErrorCheckPass(t('The confirm password does not match'));
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
      AuthApi.signup(name, email, password).then(res => {
        if (res.data.email) {
          Toast.show({
            type: 'errorToast',
            text1: t('Email already exists'),
            visibilityTime: 2000,
          });
          setErrorEmail(t('Email already exists'));
        } else {
          Toast.show({
            type: 'successToast',
            text1: t('Signup Successfully'),
            visibilityTime: 2000,
          });
          navigation.replace('Login');
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
          <Ionicons name="chevron-back" size={25} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.text}>{t('Sign Up')}</Text>
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
          title={t('Username')}
          placeholder={t('Username')}
          value={name}
          icon="user"
          textError={errorName}
          error={errorName !== ''}
          onChangeText={value => {
            setName(value);
            if (onSubmit) validateName(value);
          }}
        />
        <Input
          title={t('Password')}
          placeholder={t('Password')}
          titleInfo={t('At least 6 characters')}
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
        <Input
          title={t('Confirm Password')}
          placeholder={t('Confirm Password')}
          value={checkPass}
          secureTextEntry
          textError={errorCheckPass}
          error={errorCheckPass !== ''}
          icon="lock"
          onChangeText={value => {
            setCheckPass(value);
            if (onSubmit) validateCheckPass(value);
          }}
        />
        <View style={styles.signup}>
          <CustomButton
            buttonStyles={{
              backgroundColor: '#000000',
              width: '60%',
              height: 60,
              marginTop: 20,
            }}
            textStyles={{color: 'white'}}
            text={t('Sign Up')}
            onPressFunc={submit}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#5F7FEF',
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
