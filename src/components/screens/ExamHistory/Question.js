import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import CheckboxQuestion from './CheckboxQuestion';
import RadioQuestion from './RadioQuestion';
import {QUESTION_TYPE, QUESTION_STATUS} from '../../../constants';
import {useTranslation} from 'react-i18next';

function Question(props) {
  const {question, index} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.questionContent}>
          {t('Question')} {index + 1}: {question.question_content}
        </Text>
        {question.image && (
          <Image
            style={styles.image}
            source={{
              uri: question.image,
            }}
          />
        )}
        {question.question_type === QUESTION_TYPE.CHECKBOX ? (
          <CheckboxQuestion
            answers={question.list_ans}
            chosenAnswers={question.choosed ?? []}
          />
        ) : (
          <RadioQuestion
            answers={question.list_ans}
            chosenAnswer={question.choosed ? question.choosed[0] : null}
          />
        )}
        {question.result === QUESTION_STATUS.CORRECT ? (
          <View>
            <Text style={[styles.answer, styles.correctAnswer]}>
              {t('Your answer is correct')}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={[styles.answer, styles.falseAnswer]}>
              {t('Your answer is incorrect')}
            </Text>
          </View>
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

export default Question;
