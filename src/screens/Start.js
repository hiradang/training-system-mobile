import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/common/CustomButton';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageModal from '../components/common/LanguageModal';
import { changeLanguageUtils } from '../utils/changeLanguage';
import { LANGUAGE_CODE } from '../constants';

function Start({ navigation }) {
  const { t } = useTranslation();
  const [isShow, setShow] = useState(false);
  const [language, setLanguage] = useState('Vietnamese');
  const handleOnPress = newLanguage => {
    setLanguage(newLanguage);
    changeLanguageUtils(LANGUAGE_CODE[newLanguage]);
    AsyncStorage.setItem(
      'language',
      JSON.stringify({
        language: newLanguage,
      }),
    );
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      AsyncStorage.getItem('language').then(language => {
        const languageObject = JSON.parse(language);
        if (languageObject) setLanguage(languageObject.language);
      });
    })
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.main}>
        {isShow && (
          <LanguageModal
            showModal={isShow}
            cancelFunc={() => setShow(false)}
            language={language}
            onPress={handleOnPress}
          />
        )}
        <TouchableOpacity style={styles.language} onPress={() => setShow(true)}>
          <Text>{t('Start Language')}</Text>
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={require('../../assets/img/training-icon.png')}></Image>
      </View>
      <View style={styles.button}>
        <Text style={styles.text}>{t('Welcome To App')}</Text>
        <CustomButton
          buttonStyles={{
            backgroundColor: '#000000',
            width: '60%',
            height: 60,
            marginTop: 20,
          }}
          textStyles={{ color: 'white' }}
          text={t('Sign Up')}
          onPressFunc={() => navigation.navigate('Signup')}
        />
        <CustomButton
          buttonStyles={{
            backgroundColor: '#000000',
            width: '60%',
            height: 60,
            marginTop: 20,
          }}
          textStyles={{ color: 'white' }}
          text={t('Log In')}
          onPressFunc={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  main: {
    flex: 3,
    width: '100%',
    backgroundColor: '#3D67FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  languageModal: {
    position: 'absolute',
    top: '50%',
  },
  language: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  button: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCD4F3',
    marginTop: -150,
    marginBottom: '5%',
    backgroundColor: 'white',
  },
});
export default Start;
