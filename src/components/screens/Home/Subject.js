import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

function Subject(props) {
  const {subject, onPress} = props;
  const {t} = useTranslation();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{subject.name}</Text>
      <Text style={styles.text}>
        {t('Number of Questions')}: {subject.question_number}
      </Text>
      <Text style={styles.text}>
        {t('Duration')}: {subject.duration} {t('Minute')}
      </Text>
      <Text style={styles.text}>
        {t('Passing Score')}: {subject.score_pass}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: '500',
    marginRight: 10,
    textTransform: 'uppercase',
  },
  text: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
});

export default Subject;
