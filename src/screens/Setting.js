import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RadioButton} from 'react-native-paper';
import ConfirmationModal from '../components/common/ConfirmModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeLanguageUtils} from '../utils/changeLanguage';
import {LANGUAGE_CODE} from '../constants';
import {useTranslation} from 'react-i18next';

function Setting({navigation}) {
  const [language, setLanguage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem('language').then(language => {
      const languageObject = JSON.parse(language);
      setLanguage(languageObject.language);
    });
  }, []);

  const logOut = () => {
    setShowModal(false);
    AsyncStorage.removeItem('user');
    navigation.replace('Start');
  };

  const cancelLogOut = () => {
    setShowModal(false);
  };

  const handleChangeLanguage = value => {
    setLanguage(value);
    changeLanguageUtils(LANGUAGE_CODE[value]);
    AsyncStorage.setItem(
      'language',
      JSON.stringify({
        language: value,
      }),
    ).then(() => {
      // navigation.replace('Training System');
    });
  };
  return (
    <ScrollView style={styles.body}>
      {showModal ? (
        <ConfirmationModal
          showModal={showModal}
          negativeFunc={logOut}
          cancelFunc={cancelLogOut}
          positiveFunc={cancelLogOut}
          header={t('Log out')}
          message={t('Are you sure to log out of this device?')}
          negativeMessage={t('Yes')}
          positiveMessage={t('Stay')}
        />
      ) : null}
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>{t('Account')}</Text>
        <View style={styles.infoWrapper}>
          <View style={styles.rowWrapper}>
            <Text style={styles.text}>{t('Edit Profile')}</Text>
            <FontAwesome
              name="pencil"
              color="#14D39A"
              size={24}
              onPress={() => navigation.navigate('EditProfile')}
            />
          </View>
        </View>
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>{t('Language')}</Text>
        <View style={styles.infoWrapper}>
          <View style={[styles.rowWrapper, styles.customMarginBottom]}>
            <Text style={styles.text}>{t('Vietnamese')}</Text>
            <RadioButton
              value="Vietnamese"
              status={language === 'Vietnamese' ? 'checked' : 'unchecked'}
              onPress={() => handleChangeLanguage('Vietnamese')}
            />
          </View>
          <View style={[styles.rowWrapper, styles.customMarginBottom]}>
            <Text style={styles.text}>{t('English')}</Text>
            <RadioButton
              value="English"
              status={language === 'English' ? 'checked' : 'unchecked'}
              onPress={() => handleChangeLanguage('English')}
            />
          </View>
          <View style={styles.rowWrapper}>
            <Text style={styles.text}>{t('Japanese')}</Text>
            <RadioButton
              value="Japanese"
              status={language === 'Japanese' ? 'checked' : 'unchecked'}
              onPress={() => handleChangeLanguage('Japanese')}
            />
          </View>
        </View>
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>{t('More about us')}</Text>
        <View style={styles.infoWrapper}>
          <View style={[styles.rowWrapper, styles.customMarginBottom]}>
            <Text style={styles.text}>{t('Version')}</Text>
            <Text style={styles.text}>2022.10.01</Text>
          </View>
          <View style={styles.rowWrapper}>
            <Text style={styles.text}>{t('Developed by')}</Text>
            <Text style={styles.text}>チャカラボン</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>{t('Session')}</Text>
        <View style={styles.infoWrapper}>
          <View style={[styles.rowWrapper]}>
            <Text style={[styles.text, styles.logOutText]}>{t('Log out')}</Text>
            <MaterialIcons
              size={24}
              color="#E46B6B"
              name="logout"
              onPress={() => setShowModal(true)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#5F7FEF',
    flex: 1,
    paddingVertical: 30,
  },
  itemWrapper: {
    marginBottom: 12,
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
    paddingLeft: 30,
  },
  infoWrapper: {
    backgroundColor: '#2662BB',
    padding: 20,
    paddingLeft: 30,
    marginTop: 10,
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  customMarginBottom: {
    marginBottom: 16,
  },
  logOutText: {
    color: '#E36B6B',
  },
});
export default Setting;
