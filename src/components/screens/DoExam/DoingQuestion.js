import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import DoingCheckboxQuestion from './DoingCheckboxQuestion';
import DoingRadioQuestion from './DoingRadioQuestion';
import {QUESTION_TYPE} from '../../../constants';

function DoingQuestion(props) {
  const {question, index} = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.questionContent}>
          Câu hỏi {index + 1}: {question.question_content}
        </Text>
        {question.img && (
          <Image
            style={styles.image}
            resizeMode = 'contain'
            source={{
              uri: question.img,
            }}
          />
        )}
        {question.question_type === QUESTION_TYPE.CHECKBOX ? (
          <DoingCheckboxQuestion
            answers={question.list_ans}
            questionId={question.id}
          />
        ) : (
          <DoingRadioQuestion
            answers={question.list_ans}
            questionId={question.id}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  questionContent: {
    color: '#111',
    fontSize: 20,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 400,
    marginTop: 10,
  },
  answer: {
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  correctAnswer: {
    backgroundColor: '#79DD68',
  },
  falseAnswer: {
    backgroundColor: '#F27C7C',
  },
});

export default DoingQuestion;
