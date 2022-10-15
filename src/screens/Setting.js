import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {subjectApi} from '../services/api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RadioButton} from 'react-native-paper';

function Setting({navigation}) {
  const [language, setLanguage] = useState('Vietnamese');
  return (
    <ScrollView style={styles.body}>
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>Tài khoản</Text>
        <View style={styles.infoWrapper}>
          <View style={styles.rowWrapper}>
            <Text style={styles.text}>Chỉnh sửa profile</Text>
            <FontAwesome name="pencil" color="#14D39A" size={24} />
          </View>
        </View>
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>Ngôn ngữ</Text>
        <View style={styles.infoWrapper}>
          <View style={[styles.rowWrapper, styles.customMarginBottom]}>
            <Text style={styles.text}>Tiếng Việt</Text>
            <RadioButton
              value="Vietnamese"
              status={language === 'Vietnamese' ? 'checked' : 'unchecked'}
              onPress={() => setLanguage('Vietnamese')}
            />
          </View>
          <View style={styles.rowWrapper}>
            <Text style={styles.text}>Tiếng Anh</Text>
            <RadioButton
              value="English"
              status={language === 'English' ? 'checked' : 'unchecked'}
              onPress={() => setLanguage('English')}
            />
          </View>
        </View>
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>Thông tin</Text>
        <View style={styles.infoWrapper}>
          <View style={[styles.rowWrapper, styles.customMarginBottom]}>
            <Text style={styles.text}>Phiên bản</Text>
            <Text style={styles.text}>2022.10.01</Text>
          </View>
          <View style={styles.rowWrapper}>
            <Text style={styles.text}>Phát triển bởi</Text>
            <Text style={styles.text}>チャカラボン</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemWrapper}>
        <Text style={styles.title}>Phiên đăng nhập</Text>
        <View style={styles.infoWrapper}>
          <View>
            <Text style={[styles.text, styles.logOutText]}>Đăng xuất</Text>
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
