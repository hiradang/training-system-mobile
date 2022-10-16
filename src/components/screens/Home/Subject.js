import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function Subject(props) {
  const {subject} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{subject.name}</Text>
      <Text style={styles.text}>Số câu hỏi: {subject.name}</Text>
      <Text style={styles.text}>Thời gian: {subject.duration} phút</Text>
      <Text style={styles.text}>Điểm đạt: {subject.score_pass}</Text>
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