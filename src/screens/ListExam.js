import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {subjectApi} from '../services/api';

import CustomButton from '../components/common/CustomButton';
import SubjectInfo from '../components/screens/ListExam/SubjectInfo';
import Exam from '../components/screens/ListExam/Exam';

function ListExam({route}) {
  const {subject} = route.params;
  const [exams, setExams] = useState([]);

  const fakeExams = [
    {
      date: '13/10/2022',
      score: 8,
      status: 1,
    },
    {
      date: '12/10/2022',
      score: 4,
      status: 0,
    },
    {
      date: '11/10/2022',
      score: 2,
      status: 0,
    },
  ];

  useEffect(() => {
    setExams(fakeExams);
  }, []);
  return (
    <ScrollView style={styles.body}>
      <SubjectInfo subject={subject} />
      <View style={styles.button}>
        <CustomButton
          text="Luyện tập"
          textStyles={{color: 'white'}}
          buttonStyles={{
            backgroundColor: '#000000',
            width: '80%',
            height: 60,
            marginTop: 20,
            color: 'white',
          }}
        />
      </View>

      {exams &&
        exams.map((exam, index) => (
          <Exam key={index} subject={subject} exam={exam} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#5F7FEF',
    flex: 1,
  },
  button: {
    alignItems: 'center',
  },
});
export default ListExam;
