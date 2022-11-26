import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setExamData} from '../../../redux/actions';

function DoingRadioQuestion(props) {
  const dispatch = useDispatch();
  const {answers, questionId} = props;
  const [selectedAnswer, setSelectedAnswer] = useState();
  const {examData} = useSelector(state => state.taskReducer);

  const handlePress = answerId => {
    let newSelectedAnswer;
    if (answerId === selectedAnswer) {
      newSelectedAnswer = null;
    } else {
      newSelectedAnswer = answerId;
    }
    setSelectedAnswer(newSelectedAnswer);

    // Update to redux
    examData[questionId] = {
      id: newSelectedAnswer,
    };
    dispatch(setExamData(examData));
  };

  return (
    <View style={styles.container}>
      {answers.map((answer, index) => (
        <View key={index} style={styles.wrapper}>
          <RadioButton
            status={selectedAnswer === answer.id ? 'checked' : 'unchecked'}
            onPress={() => handlePress(answer.id)}
          />
          <Text style={styles.answerContent}>{answer.content}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  answerContent: {
    color: 'white',
    fontSize: 16,
  },
});

export default DoingRadioQuestion;
