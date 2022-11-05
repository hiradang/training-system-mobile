import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Input from '../components/common/Input';
import {subjectApi} from '../services/api';
import Subject from '../components/screens/Home/Subject';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

function Home({navigation}) {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState('');
  const {userId} = useSelector(state => state.taskReducer);
  const {t} = useTranslation();
  useEffect(() => {
    subjectApi.getSubjects({name: search}).then(res => {
      setSubjects(res.data);
    });
  }, [search]);

  return (
    <ScrollView style={styles.body}>
      <Text style={styles.title}>{t('Subjects in the system')}</Text>

      <Input
        style={styles.inputSearch}
        value={search}
        icon="search"
        onChangeText={setSearch}
        placeholder={t('Search')}
        placeholderTextColor="#000"
      />

      {subjects.length > 0 && (
        <View style={styles.subjectContainer}>
          {subjects.map((subject, index) => (
            <Subject
              key={index}
              subject={subject}
              onPress={() =>
                navigation.push('ListExam', {
                  subject: subject,
                  title: subject.name,
                  userId: userId,
                })
              }
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#5F7FEF',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  inputSearch: {
    width: '100%',
  },
  subjectContainer: {
    marginTop: -10,
  },
});
export default Home;
