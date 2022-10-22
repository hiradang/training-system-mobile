import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Input from '../components/common/Input';
import {subjectApi} from '../services/api';

import Subject from '../components/screens/Home/Subject';

function Home({navigation}) {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    subjectApi.getSubjects({'q%5Bname%5D': search}).then(res => {
      console.log('running');
      setSubjects(res.data);
    });
  }, [search]);

  return (
    <ScrollView style={styles.body}>
      <Text style={styles.title}>Các khóa học trong hệ thống</Text>

      <Input
        style={styles.inputSearch}
        value={search}
        icon="search"
        onChangeText={setSearch}
        placeholder="Tìm kiếm"
        placeholderTextColor="#000"
      />

      {subjects && (
        <View style={styles.subjectContainer}>
          {subjects.map((subject, index) => (
            <Subject
              key={index}
              subject={subject}
              onPress={() =>
                navigation.push('ListExam', {
                  subject: subject,
                  title: subject.name,
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
