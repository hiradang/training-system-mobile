import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {convertDate} from '../../../utils/converDate';

function ExamInfo(props) {
  const {subject, exam} = props;
  return (
    <View style={styles.subjectContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Tên môn học: </Text>
        <Text style={styles.text}>{subject.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Số câu hỏi: </Text>
        <Text style={styles.text}>{subject.question_number}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Thời gian: </Text>
        <Text style={styles.text}>{subject.duration} phút</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Điểm đạt: </Text>
        <Text style={styles.text}>{subject.score_pass}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Ngày tạo: </Text>
        <Text style={styles.text}>{convertDate(exam.created_at)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subjectContainer: {
    padding: 20,
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111',
  },
  text: {
    fontSize: 18,
    color: '#222',
  },
});

export default ExamInfo;
