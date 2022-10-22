import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {examApi} from '../services/api';
import {EXAM_STATUS} from '../constants';
import {useFocusEffect} from '@react-navigation/native';

import CustomButton from '../components/common/CustomButton';
import SubjectInfo from '../components/screens/ListExam/SubjectInfo';
import Exam from '../components/screens/ListExam/Exam';
import Toast from 'react-native-toast-message';

function ListExam({route, navigation}) {
  const {subject, userId} = route.params;
  const [exams, setExams] = useState([]);

  const examOnPress = exam => {
    if (exam.status === EXAM_STATUS.READY) {
      navigation.navigate('JoinExam', {
        subject: subject,
        exam: exam,
        title: subject.name,
      });
    } else if (exam.status === EXAM_STATUS.DOING) {
      navigation.navigate('DoExam', {
        title: subject.name,
        examId: exam.id,
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

  useFocusEffect(
    useCallback(() => {
      setExams([]);
      examApi.getListExams(subject.id, userId).then(res => {
        setExams(res.data);
      });
    }, []),
  );

  const creatNewExam = () => {
    examApi.createExam(subject.id, userId).then(res => {
      let newExam = {...res.data, status: 'ready'};
      setExams(preExams => [newExam, ...preExams]);
      Toast.show({
        type: 'successToast',
        text1: 'Tạo bài thi mới thành công',
        visibilityTime: 2000,
      });
    });
  };

  return (
    <ScrollView style={styles.body}>
      <SubjectInfo subject={subject} />
      <View style={styles.button}>
        <CustomButton
          text="Luyện tập"
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

      {exams.length > 0 ? (
        exams.map((exam, index) => (
          <Exam
            key={index}
            subject={subject}
            exam={exam}
            onPress={() => examOnPress(exam)}
          />
        ))
      ) : (
        <View>
          <Text style={styles.noExamText}>Bạn chưa làm bài thi nào.</Text>
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
