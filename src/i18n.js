import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LANGUAGE_CODE} from './constants';
import translationEN from '../assets/locales/en.json';
import translationVI from '../assets/locales/vi.json';
import translationJP from '../assets/locales/jp.json';

const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
  jp: {
    translation: translationJP,
  },
};

// AsyncStorage.getItem('language').then(language => {
//   let languageCode;
//   const languagetObject = JSON.parse(language);
//   if (languagetObject) {
//     languageCode = LANGUAGE_CODE[languagetObject.language];
//   } else {
//     languageCode = 'vi';
//   }
//   i18n.use(initReactI18next).init({
//     compatibilityJSON: 'v3',
//     resources,
//     lng: languageCode,
//     interpolation: {
//       escapeValue: false,
//     },
//   });
// });

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    try {
      AsyncStorage.getItem('language').then(language => {
        const languageObject = JSON.parse(language);
        if (languageObject) {
          callback(LANGUAGE_CODE[languageObject.language]);
        } else callback('vi');
      });
    } catch (error) {
      console.error(error);
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources,
    // lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
