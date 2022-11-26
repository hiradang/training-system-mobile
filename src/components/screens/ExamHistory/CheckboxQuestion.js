import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Checkbox} from 'react-native-paper';

function CheckboxQuestion(props) {
  const {answers, chosenAnswers} = props;
  return (
    <View style={styles.container}>
      {answers.map((answer, index) => (
        <View key={index} style={styles.wrapper}>
          <Checkbox
            disabled={true}
            status={chosenAnswers.includes(answer.id) ? 'checked' : 'unchecked'}
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

export default CheckboxQuestion;
