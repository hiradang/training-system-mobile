import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {questionApi} from '../services/api';
import Question from '../components/screens/ExamHistory/Question';

function DoExam({route}) {
  const {examId} = route.params;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    questionApi.getQuestions(examId).then(res => {
      setQuestions(res.data.list_question);
    });
  }, []);

  return (
    <ScrollView style={styles.body}>
      {questions &&
        questions.map((question, index) => (
          <Question key={index} question={question} index={index} />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#5F7FEF',
    flex: 1,
  },
});
export default DoExam;
