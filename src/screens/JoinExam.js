import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import ExamInfo from '../components/screens/JoinExam/ExamInfo';
import CustomButton from '../components/common/CustomButton';

function JoinExam({route, navigation}) {
  const {subject, exam} = route.params;
  return (
    <View style={styles.container}>
      <ExamInfo subject={subject} exam={exam} />
      <View style={styles.image}>
        <Image source={require('../../assets/img/joinExam.png')} />
      </View>

      <View style={styles.startButton}>
        <CustomButton
          text="Bắt đầu"
          textStyles={{color: 'white'}}
          onPressFunc={() =>
            navigation.navigate('DoExam', {
              title: subject.name,
              examId: exam.id,
            })
          }
          buttonStyles={{
            backgroundColor: '#000000',
            width: '80%',
            height: 60,
            marginTop: 20,
            color: 'white',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5F7FEF',
    height: '100%',
  },
  image: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  startButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 32,
  },
});

export default JoinExam;
