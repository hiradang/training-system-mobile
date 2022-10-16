import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {EXAM_STATUS} from '../../../constants';

function Exam(props) {
  const {subject, exam, onPress} = props;
  const [examStatus, setExamStatus] = useState();
  const [examStatusClass, setExamStatusClass] = useState();

  useEffect(() => {
    if (exam.status === EXAM_STATUS.PASS) {
      setExamStatus('Đạt');
      setExamStatusClass('passed');
    } else if (exam.status === EXAM_STATUS.FAILED) {
      setExamStatus('Không Đạt');
      setExamStatusClass('failed');
    } else if (exam.status === EXAM_STATUS.READY) {
      setExamStatus('Sẵn sàng');
      setExamStatusClass('ready');
    } else setExamStatus('');
  }, []);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.subjectName}>{subject.name}</Text>
        <Text style={[styles[examStatusClass], styles.examStatus]}>
          {examStatus}
        </Text>
      </View>
      <View>
        {exam.status === EXAM_STATUS.READY ? (
          <Text style={styles.text}>Ngày tạo: {exam.date}</Text>
        ) : (
          <Text style={styles.text}>Ngày thi: {exam.date}</Text>
        )}
      </View>
      {exam.score && (
        <View>
          <Text style={styles.text}>
            Điểm: {exam.score}/{subject.score_pass}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  subjectName: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#111',
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    color: '#111',
  },
  examStatus: {
    fontWeight: '500',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  passed: {
    backgroundColor: '#79DD68',
  },
  failed: {
    backgroundColor: '#F27C7C',
  },
  ready: {
    backgroundColor: '#7CDDF2',
  },
});

export default Exam;
