import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import CommonHead from '../components/styles/CommonHead';
import {images} from '../assets';
import {useNavigation} from '@react-navigation/native';
import Font600 from '../components/font/Font600';
import Button from '../components/styles/Button';
import {colors} from '../constants/colors';
import Font700 from '../components/font/Font700';
import ProgressBar from '../components/styles/ProgressBar';

const array = Array(6).fill(0);

const LearnWithQuiz = ({route}) => {
  const set_no = route?.params?.set_no;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const {goBack} = useNavigation();

  useEffect(() => {
    const progressPercentage = ((currentIndex + 1) / array.length) * 100;
    setProgress(progressPercentage);
  }, [currentIndex]);

  const onNextHandler = useCallback(
    () => setCurrentIndex(prev => (prev + 1 < array.length ? prev + 1 : prev)),
    [],
  );

  const onPrevHandler = useCallback(
    () => setCurrentIndex(prev => (prev >= 0 ? prev - 1 : prev)),
    [],
  );

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={'Idioms And Phrases'}
        extraHeight={33}>
        <Font600 style={styles.heading}>{set_no}</Font600>
      </CommonHead>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.progressContainer}>
          <ProgressBar
            height={40}
            progress={progress}
            barColor={colors.color228ED5}
            backgroundColor={colors.colorC0DFF7}
            totalQuestion={array.length}
            completedQuestion={currentIndex}
          />
        </View>
        <View style={styles.questionContainer}>
          <Font600 style={styles.questionTitle}>{'All Thumbs'}</Font600>
        </View>
        <View style={styles.answerContainer}>
          {Array(4)
            .fill(0)
            .map((_, index) => {
              return (
                <Pressable style={styles.answer} key={index?.toString()}>
                  <Font600 style={styles.answerText}>
                    {index === 0
                      ? 'A.  '
                      : index === 1
                      ? 'B.  '
                      : index === 2
                      ? 'C.  '
                      : 'D.  '}
                  </Font600>
                  <Font600 style={styles.answerText}>{'All Thumbs'}</Font600>
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        {currentIndex !== 0 ? (
          <Button
            onPress={onPrevHandler}
            iconStyle={styles.buttonIcon}
            icon={images.arrow_left}>
            {'Prev'}
          </Button>
        ) : (
          <View />
        )}
        {array?.length !== currentIndex + 1 ? (
          <Button
            onPress={onNextHandler}
            iconStyle={styles.buttonIcon}
            buttonStyle={styles.next}
            icon={images.arrow_right}>
            {'Next'}
          </Button>
        ) : (
          <View />
        )}
      </View>
      <View
        style={{
          height: 52,
          justifyContent: 'center',
          backgroundColor: colors.colorFF0E0E,
        }}>
        <Font700 style={{color: colors.white, textAlign: 'center'}}>
          {'ADD'}
        </Font700>
      </View>
    </View>
  );
};

export default memo(LearnWithQuiz);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  heading: {
    top: 22,
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  progressContainer: {
    marginTop: 10,
    marginHorizontal: 8,
  },
  questionContainer: {
    height: 173,
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorDCF9FF,
    borderColor: colors.transparent_black_10,
  },
  questionTitle: {
    fontSize: 18,
    color: colors.black,
  },
  answerContainer: {
    marginHorizontal: 8,
    marginTop: 16,
  },
  answer: {
    height: 41,
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {height: 2, width: 0},
    borderColor: colors.transparent_black_10,
  },
  buttonIcon: {
    height: 24,
    width: 24,
  },
  answerText: {
    fontSize: 18,
  },
  buttonContainer: {
    bottom: 52,
    width: '100%',
    marginBottom: 1,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  next: {
    flexDirection: 'row-reverse',
  },
});
