import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import Font600 from '../components/font/Font600';
import Font700 from '../components/font/Font700';
import QuestionSubmitModel from '../components/model/QuestionSubmitModel';
import Button from '../components/styles/Button';
import CommonHead from '../components/styles/CommonHead';
import ProgressBar from '../components/styles/ProgressBar';
import {colors} from '../constants/colors';
import {get_data} from '../utils/api';

const LearnWithQuiz = ({route}) => {
  const {title, id} = route?.params?.data;

  console.log('id', id);

  const questionModel = useRef();

  const {goBack} = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = useCallback(async () => {
    const data = {
      access_key: 6808,
      get_questions_by_learning: 1,
      learning_id: id,
    };

    try {
      setLoader(true);
      const response = await get_data(data);
      setData(response?.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) getData();
  }, [id]);

  useEffect(() => {
    if (!data || data?.length === 0) return;
    const progressPercentage = ((currentIndex + 1) / data?.length) * 100;
    setProgress(progressPercentage);
  }, [currentIndex, data]);

  useEffect(() => {
    if (data?.length - 1 === currentIndex) questionModel?.current?.open();
  }, [currentIndex, data]);

  const onNextHandler = useCallback(
    () => setCurrentIndex(prev => (prev + 1 < data.length ? prev + 1 : prev)),
    [],
  );

  const onPrevHandler = useCallback(
    () => setCurrentIndex(prev => (prev >= 0 ? prev - 1 : prev)),
    [],
  );

  return (
    <View style={styles.root}>
      <QuestionSubmitModel ref={questionModel} />
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={'Idioms And Phrases'}
        extraHeight={33}>
        <Font600 style={styles.heading}>{title}</Font600>
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
            totalQuestion={data.length}
            completedQuestion={currentIndex}
          />
        </View>
        <View style={styles.questionContainer}>
          <Font600 style={styles.questionTitle}>{'All Thumbs'}</Font600>
        </View>
        <View style={styles.answerContainer}>
          <Pressable style={styles.answer}>
            <Font600 style={styles.answerText}></Font600>
            <Font600 style={styles.answerText}>
              {data[currentIndex]?.optiona}
            </Font600>
          </Pressable>
          <Pressable style={styles.answer}>
            <Font600 style={styles.answerText}></Font600>
            <Font600 style={styles.answerText}>
              {data[currentIndex]?.optionb}
            </Font600>
          </Pressable>
          <Pressable style={styles.answer}>
            <Font600 style={styles.answerText}></Font600>
            <Font600 style={styles.answerText}>
              {data[currentIndex]?.optionc}
            </Font600>
          </Pressable>
          <Pressable style={styles.answer}>
            <Font600 style={styles.answerText}></Font600>
            <Font600 style={styles.answerText}>
              {data[currentIndex]?.optiond}
            </Font600>
          </Pressable>
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
        {data?.length !== currentIndex + 1 ? <View /> : null}

        {data?.length !== currentIndex + 1 ? (
          <Button
            onPress={onNextHandler}
            iconStyle={styles.buttonIcon}
            buttonStyle={styles.next}
            icon={images.arrow_right}>
            {'Next'}
          </Button>
        ) : (
          <Button
            onPress={onNextHandler}
            buttonStyle={{flex: 1, marginHorizontal: 8, marginBottom: 20}}
            icon={images.arrow_right}>
            {'Submit Test'}
          </Button>
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
