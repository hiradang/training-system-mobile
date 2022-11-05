import i18n from '../i18n';

export const changeLanguageUtils = languageCode => {
  i18n.changeLanguage(languageCode, (err, t) => {
    t('key');
  });
};
