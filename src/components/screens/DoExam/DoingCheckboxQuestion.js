import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setExamData} from '../../../redux/actions';

function DoingCheckboxQuestion(props) {
  const dispatch = useDispatch();
  const {answers, questionId} = props;
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const {examData} = useSelector(state => state.taskReducer);

  const handlePress = answerId => {
    let newSelectedAnswers;
    if (selectedAnswers.includes(answerId)) {
      newSelectedAnswers = selectedAnswers.filter(
        answer => answer !== answerId,
      );
      setSelectedAnswers(newSelectedAnswers);
    } else {
      newSelectedAnswers = [...selectedAnswers, answerId];
      setSelectedAnswers(newSelectedAnswers);
    }

    examData[questionId] = {
      id: newSelectedAnswers,
    };
    dispatch(setExamData(examData));
  };

  return (
    <View style={styles.container}>
      {answers.map((answer, index) => (
        <View key={index} style={styles.wrapper}>
          <Checkbox
            status={
              selectedAnswers.includes(answer.id) ? 'checked' : 'unchecked'
            }
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

export default DoingCheckboxQuestion;
