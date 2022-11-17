import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { questionApi, examApi } from '../services/api';
import DoingQuestion from '../components/screens/DoExam/DoingQuestion';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import ConfirmModal from '../components/common/ConfirmModal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function DoExam({ route, navigation }) {
  const { examId, subject, userId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [isShow, setShowModal] = useState(false);
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(null);
  const { examData } = useSelector(state => state.taskReducer);
  const { t } = useTranslation();
  useEffect(() => {
    questionApi.getQuestions(examId).then(res => {
      setQuestions(res.data.list_question);

      var currentTime = moment(Date.now());
      var endTime = moment(new Date(res.data.endtime));
      var diff = endTime.diff(currentTime, 'seconds');
      if (diff > 0) {
        setRemainingTimeInSeconds(diff);
      }
    });
  }, []);

  const openConfirmSubmitModal = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    setShowModal(false);
    examApi.submitExam(examId, { question: examData }).then(res => {
      navigation.replace("ListExam", {
        reload: true,
        subject: subject,
        title: subject.name,
        userId: userId,
      });
    });
  };

  const cancelSubmit = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.body}>
      {isShow && (
        <ConfirmModal
          showModal={isShow}
          negativeFunc={cancelSubmit}
          cancelFunc={cancelSubmit}
          positiveFunc={handleSubmit}
          header={t('Submit')}
          message={t('Are you sure want to submit?')}
          negativeMessage={t('Continue')}
          positiveMessage={t('Submit')}
        />
      )}
      {remainingTimeInSeconds && (
        <View style={styles.countDown}>
          <View>
            <CountDown
              until={remainingTimeInSeconds}
              timeToShow={
                remainingTimeInSeconds > 3600 ? ['H', 'M', 'S'] : ['M', 'S']
              }
              timeLabels
              showSeparator={true}
              onFinish={handleSubmit}
            />
          </View>
          <TouchableOpacity onPress={openConfirmSubmitModal}>
            <Text style={styles.submitTitle}>{t('Submit')}</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView>
        {questions &&
          questions.map((question, index) => (
            <DoingQuestion key={index} question={question} index={index} />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#5F7FEF',
    flex: 1,
  },
  countDown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  submitTitle: {
    backgroundColor: '#34eb4f',
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  countDownText: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
export default DoExam;
