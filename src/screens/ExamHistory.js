import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {subjectApi} from '../services/api';
import Question from '../components/screens/ExamHistory/Question';

function ExamHistory() {
  const [questions, setQuestions] = useState([]);

  const fakeQuestions = [
    {
      questionContent: '1 + 1 = ?',
      type: 'radio',
      answers: [
        {
          content: '2',
          selected: true,
        },
        {
          content: '3',
          selected: false,
        },
      ],
      status: true,
      image: 'https://i.ytimg.com/vi/M2IrP8-P1Bo/hqdefault.jpg',
    },
    {
      questionContent: '1 + 2 = ?',
      type: 'radio',
      answers: [
        {
          content: '2',
          selected: true,
        },
        {
          content: '3',
          selected: false,
        },
      ],
      status: false,
      image:
        'https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/bhagyasri-march4okw-05-1615354270.png',
    },
    {
      questionContent: 'Chọn các từ chỉ con vật.',
      type: 'checkbox',
      answers: [
        {
          content: 'Chó',
          selected: true,
        },
        {
          content: 'Mèo',
          selected: true,
        },
        {
          content: 'Bàn',
          selected: false,
        },
      ],
      image: '',
      status: true,
    },
  ];

  useEffect(() => {
    setQuestions(fakeQuestions);
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
export default ExamHistory;
