import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {EXAM_STATUS} from '../../../constants';
import {convertDate} from '../../../utils/converDate';
import {useTranslation} from 'react-i18next';

function Exam(props) {
  const {subject, exam, onPress} = props;
  const [examStatus, setExamStatus] = useState();
  const [examStatusClass, setExamStatusClass] = useState();
  const {t} = useTranslation();

  useEffect(() => {
    if (exam.status === EXAM_STATUS.PASS) {
      setExamStatus(t('Passed'));
      setExamStatusClass('passed');
    } else if (exam.status === EXAM_STATUS.FAILED) {
      setExamStatus(t('Failed'));
      setExamStatusClass('failed');
    } else if (exam.status === EXAM_STATUS.READY) {
      setExamStatus(t('Ready'));
      setExamStatusClass('ready');
    } else if (exam.status === EXAM_STATUS.DOING) {
      setExamStatus(t('Doing'));
      setExamStatusClass('doing');
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
          <Text style={styles.text}>
            {t('Created at')}: {convertDate(exam.created_at)}
          </Text>
        ) : (
          <Text style={styles.text}>
            {t('Exam Date')}: {convertDate(exam.endtime)}
          </Text>
        )}
      </View>
      {exam.status !== EXAM_STATUS.READY && exam.status !== EXAM_STATUS.DOING && (
        <View>
          <Text style={styles.text}>
            {t('Score')}: {exam.result}/{subject.question_number}
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
  doing: {
    backgroundColor: '#EFF184',
  },
});

export default Exam;
