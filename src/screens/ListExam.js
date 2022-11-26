import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {examApi} from '../services/api';
import {EXAM_STATUS} from '../constants';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';

import CustomButton from '../components/common/CustomButton';
import SubjectInfo from '../components/screens/ListExam/SubjectInfo';
import Exam from '../components/screens/ListExam/Exam';
import Toast from 'react-native-toast-message';

function ListExam({route, navigation}) {
  const {subject, userId} = route.params;
  const [exams, setExams] = useState(null);
  const [reload, setReload] = useState(false);
  const [newExam, setNewExam] = useState(0);
  const {t} = useTranslation();

  const examOnPress = exam => {
    if (exam.status === EXAM_STATUS.READY) {
      navigation.navigate('JoinExam', {
        subject: subject,
        exam: exam,
        title: subject.name,
        userId: userId,
      });
    } else if (exam.status === EXAM_STATUS.DOING) {
      navigation.replace('DoExam', {
        title: subject.name,
        examId: exam.id,
        subject: subject,
        userId: userId,
      });
    } else if (
      exam.status === EXAM_STATUS.FAILED ||
      exam.status === EXAM_STATUS.PASS
    ) {
      navigation.navigate('ExamHistory', {
        title: subject.name,
        examId: exam.id,
      });
    }
  };

  useEffect(() => {
    setExams(null);
    examApi.getListExams(subject.id, userId).then(res => {
      setExams(res.data);
    });
  }, [newExam]);

  const creatNewExam = () => {
    examApi.createExam(subject.id, userId).then(res => {
      setNewExam(pre => pre + 1);
      // let newExam = { ...res.data, status: 'ready', id: res.data.exam_id, user_id: userId };
      // setExams(preExams => [...preExams, newExam]);
      Toast.show({
        type: 'successToast',
        text1: t('Create new exam successfully'),
        visibilityTime: 2000,
      });
    });
  };

  return (
    <ScrollView style={styles.body}>
      <SubjectInfo subject={subject} />
      <View style={styles.button}>
        <CustomButton
          text={t('Practice')}
          onPressFunc={creatNewExam}
          textStyles={{color: 'white'}}
          buttonStyles={{
            backgroundColor: '#000000',
            width: '80%',
            height: 60,
            marginTop: 20,
            color: 'white',
          }}
        />
      </View>

      {exams !== null &&
        exams.length > 0 &&
        exams.map((exam, index) => (
          <Exam
            key={index}
            subject={subject}
            exam={exam}
            onPress={() => examOnPress(exam)}
          />
        ))}
      {exams !== null && exams.length === 0 && (
        <View>
          <Text style={styles.noExamText}>
            {t('You have not done any exam yet.')}
          </Text>
        </View>
      )}
      {exams === null && (
        <View style={{marginTop: 30}}>
          <ActivityIndicator size="large" color="#ffffff"></ActivityIndicator>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#5F7FEF',
    flex: 1,
  },
  button: {
    alignItems: 'center',
  },
  noExamText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    marginTop: 30,
  },
});
export default ListExam;
