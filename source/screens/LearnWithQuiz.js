import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import {useSelector} from 'react-redux';
import {images} from '../assets';
import Font400 from '../components/font/Font400';
import Font600 from '../components/font/Font600';
import Font700 from '../components/font/Font700';
import QuestionSubmitModel from '../components/model/QuestionSubmitModel';
import ScoreModel from '../components/model/ScoreModel';
import BannerADs from '../components/styles/BannerADs';
import Button from '../components/styles/Button';
import CommonHead from '../components/styles/CommonHead';
import ProgressBar from '../components/styles/ProgressBar';
import {colors} from '../constants/colors';
import {get_data} from '../utils/api';
import EmptyList from '../components/list/EmptyList';

const adUnitId = 'ca-app-pub-6464114688925756/5287737073';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const LearnWithQuiz = ({route}) => {
  const {title, id, category_name, type} = route?.params?.data;

  const {goBack} = useNavigation();

  const user = useSelector(state => state?.auth);

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [rightAnswerCount, setRightAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [skipAnswerCount, setSkipAnswerCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const focus = useIsFocused();

  const questionModel = useRef();
  const scoreModel = useRef();

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (
      rightAnswerCount + wrongAnswerCount + skipAnswerCount === data?.length &&
      data?.length !== 0
    ) {
      questionModel?.current?.open();
    }
  }, [rightAnswerCount, wrongAnswerCount, skipAnswerCount, data]);

  useEffect(() => {
    if (!focus) return;

    const backAction = () => {
      try {
        if (!loaded) {
          return null;
        }
        interstitial?.show();
      } catch (err) {
        console.log('err', err);
      }
      goBack();
      setData();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [focus, loaded]);

  const onGoBack = useCallback(() => {
    try {
      if (!loaded) {
        return null;
      }
      interstitial?.show();
      goBack();
      setData();
    } catch (err) {
      console.log('err', err);
    }
  }, [loaded]);

  const onSubmit = useCallback(() => {
    if (
      rightAnswerCount + wrongAnswerCount + skipAnswerCount ===
        data?.length - 1 &&
      data?.length !== 0
    ) {
      questionModel?.current?.open();
    } else {
      questionModel?.current?.close();
      scoreModel?.current?.open();

      try {
        if (!loaded) {
          return null;
        }
        interstitial?.show();
      } catch (err) {
        console.log('err', err);
      }
    }
  }, [rightAnswerCount, wrongAnswerCount, skipAnswerCount, data, loaded]);

  const getData = useCallback(async () => {
    let data = {
      access_key: 6808,
      learning_id: id,
      get_questions_by_learning: 1,
      language_id: user?.user?.language,
    };

    if (type === '1') {
      data = {
        access_key: 6808,
        get_questions_by_subcategory: 1,
        subcategory: id,
      };
    }

    try {
      setLoader(true);
      const response = await get_data(data);

      const newData = response?.data?.map(item => {
        const options = [
          item?.optiona,
          item?.optionb,
          item?.optionc,
          item?.optiond,
        ];

        const answer =
          item?.answer?.toString()?.toLowerCase() === 'a'
            ? item?.optiona
            : item?.answer?.toString()?.toLowerCase() === 'b'
            ? item?.optionb
            : item?.answer?.toString()?.toLowerCase() === 'c'
            ? item?.optionc
            : item?.optiond;

        options.sort(() => Math.random() - 0.5);

        const correctOptionIndex = options.indexOf(answer);

        return {
          ...item, // Spread existing properties
          optiona: options[0],
          optionb: options[1],
          optionc: options[2],
          optiond: options[3],
          answer: options[correctOptionIndex],
        };
      });

      setData(newData);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }, [id, type]);

  useEffect(() => {
    if (id) getData();
  }, [id]);

  const options = {
    a: data[currentIndex]?.optiona,
    b: data[currentIndex]?.optionb,
    c: data[currentIndex]?.optionc,
    d: data[currentIndex]?.optiond,
  };

  const option_array = [options?.a, options?.b, options?.c, options?.d];

  const onNextHandler = useCallback(() => {
    setCurrentIndex(prev => {
      if (data?.length > prev + 1) return prev + 1;
      return prev;
    });
    if (!selectedAnswer) setSkipAnswerCount(prev => prev + 1);
    setSelectedAnswer();
  }, [data, selectedAnswer]);

  useEffect(() => {
    if (data?.length !== 0)
      setProgress(((currentIndex + 1) * 100) / data?.length);
  }, [currentIndex, data]);

  const setSelectedAnswerHandler = useCallback(
    answer => {
      if (selectedAnswer) return;
      if (answer === data[currentIndex].answer) {
        setRightAnswerCount(prev => prev + 1);
      } else {
        setWrongAnswerCount(prev => prev + 1);
      }
      setSelectedAnswer(answer);
    },
    [currentIndex, data, selectedAnswer],
  );

  const onSubmitHandler = useCallback(() => {
    questionModel?.current?.close();
    scoreModel?.current?.open();

    try {
      if (!loaded) {
        return null;
      }
      interstitial?.show();
    } catch (err) {
      console.log('err', err);
    }
  }, [loaded]);

  return (
    <View style={styles.root}>
      <QuestionSubmitModel
        ref={questionModel}
        attempt={rightAnswerCount + wrongAnswerCount}
        total={data?.length}
        onSubmit={onSubmitHandler}
      />
      <ScoreModel
        ref={scoreModel}
        right={rightAnswerCount}
        wrong={wrongAnswerCount}
        total={data?.length}
        title={'Result : ' + category_name}
      />
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={onGoBack}
        title={category_name}
        extraHeight={33}>
        <Font600 style={styles.heading}>{title}</Font600>
      </CommonHead>
      {loader || !loaded ? (
        <EmptyList loader={loader || !loaded} message={'No Data Available'} />
      ) : (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.progressContainer}>
              {progress ? (
                <ProgressBar
                  height={40}
                  progress={progress}
                  barColor={colors.color228ED5}
                  backgroundColor={colors.colorC0DFF7}
                  totalQuestion={data.length}
                  completedQuestion={currentIndex + 1}
                />
              ) : null}
            </View>
            <View style={styles.questionContainer}>
              {data[currentIndex]?.question ? (
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
                  bounces={false}>
                  <Font600 style={styles.questionTitle}>
                    {data[currentIndex]?.question}
                  </Font600>
                </ScrollView>
              ) : null}
            </View>
            <View style={styles.answerContainer}>
              {option_array?.map((ele, index) => {
                if (!ele) return null;
                return (
                  <Pressable
                    key={index}
                    onPress={setSelectedAnswerHandler.bind(null, ele)}
                    style={[
                      styles.answer,
                      selectedAnswer
                        ? data[currentIndex].answer === ele
                          ? styles.rightAnswer
                          : selectedAnswer === ele
                          ? styles.wrongAnswer
                          : null
                        : null,
                    ]}>
                    <View style={styles.answerTextContainer}>
                      <Font600 style={styles.answerText}>
                        {category_name !== 'Error Correction'
                          ? String.fromCharCode(65 + index) + '. ' + ele
                          : ele}
                      </Font600>
                    </View>
                    {selectedAnswer ? (
                      <FastImage
                        source={
                          data[currentIndex].answer === ele
                            ? images.correct_answer
                            : selectedAnswer === ele
                            ? images.wrong_answer
                            : null
                        }
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.noteContainer}>
              {data[currentIndex]?.note && selectedAnswer ? (
                <Font400 style={styles.note}>
                  <Font700>{'Note :'}</Font700> {data[currentIndex]?.note}
                </Font400>
              ) : null}
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <View />

            {rightAnswerCount + wrongAnswerCount + skipAnswerCount <
            data?.length ? (
              <Button
                onPress={onNextHandler}
                iconStyle={styles.buttonIcon}
                buttonStyle={styles.next}
                icon={images.arrow_right}>
                {selectedAnswer ? 'Next' : 'Skip'}
              </Button>
            ) : null}
          </View>
          {rightAnswerCount + wrongAnswerCount + skipAnswerCount >=
            data?.length && data?.length !== 0 ? (
            <Button onPress={onSubmit} buttonStyle={styles.submit}>
              {'Submit'}
            </Button>
          ) : null}
        </>
      )}
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
    backgroundColor: colors.colorF0FFFF,
    borderColor: colors.transparent_black_10,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    paddingVertical: 8,
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingRight: 36,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {height: 2, width: 0},
    borderColor: colors.transparent_black_10,
  },
  icon: {
    height: 24,
    width: 24,
  },
  buttonIcon: {
    height: 24,
    width: 24,
  },
  answerTextContainer: {
    flex: 1,
  },
  answerText: {
    fontSize: 18,
    paddingRight: 20,
    paddingLeft: 10,
  },
  noteContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  note: {
    fontSize: 14,
    paddingBottom: 50,
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
  submit: {
    marginBottom: 1,
    marginHorizontal: 12,
  },
  rightAnswer: {
    borderWidth: 1,
    borderColor: colors.color4ABBD2,
    backgroundColor: colors.colorsDBFAFE,
  },
  wrongAnswer: {
    borderWidth: 1,
    borderColor: colors.colorF90000,
    backgroundColor: colors.colorFEDFDC,
  },
});
