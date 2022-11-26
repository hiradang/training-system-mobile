import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

function RadioQuestion(props) {
  const {answers, chosenAnswer} = props;
  return (
    <View style={styles.container}>
      {answers.map((answer, index) => (
        <View key={index} style={styles.wrapper}>
          <RadioButton
            disabled={true}
            status={answer.id === chosenAnswer ? 'checked' : 'unchecked'}
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

export default RadioQuestion;
