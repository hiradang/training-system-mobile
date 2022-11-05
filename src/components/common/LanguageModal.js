import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

const LanguageModal = props => {
  const {language, onPress, showModal} = props;
  const [showConfirmModal, setShowConfirmModal] = useState(showModal);
  const {t} = useTranslation();

  return (
    <Modal
      visible={showConfirmModal}
      onRequestClose={() => setShowConfirmModal(false)}
      transparent={true}
      animationType="fade"
      hardwareAccelerated>
      <TouchableWithoutFeedback onPress={() => props.cancelFunc()}>
        <View style={styles.confirmContainer}>
          <View style={styles.confirmModal}>
            <Text style={styles.title}>{t('Change Language')}</Text>
            <View style={styles.rowWrapper}>
              <RadioButton
                value="Vietnamese"
                status={language === 'Vietnamese' ? 'checked' : 'unchecked'}
                onPress={() => onPress('Vietnamese')}
              />
              <Text>{t('Vietnamese')} 🇻🇳</Text>
            </View>
            <View style={styles.rowWrapper}>
              <RadioButton
                value="English"
                status={language === 'English' ? 'checked' : 'unchecked'}
                onPress={() => onPress('English')}
              />
              <Text>{t('English')} 🇺🇸</Text>
            </View>
            <View style={styles.rowWrapper}>
              <RadioButton
                value="Japanese"
                status={language === 'Japanese' ? 'checked' : 'unchecked'}
                onPress={() => onPress('Japanese')}
              />
              <Text>{t('Japanese')} 🇯🇵</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  confirmContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000021',
  },
  confirmModal: {
    backgroundColor: '#fff',
    width: 320,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  rowWrapper: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LanguageModal;
