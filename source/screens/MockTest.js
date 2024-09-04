import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import {images} from '../assets';
import Font400 from '../components/font/Font400';
import Font500 from '../components/font/Font500';
import Font600 from '../components/font/Font600';
import Font700 from '../components/font/Font700';
import QuestionSubmitModel from '../components/model/QuestionSubmitModel';
import TostModel from '../components/model/TostModel';
import BannerADs from '../components/styles/BannerADs';
import Button from '../components/styles/Button';
import CommonHead from '../components/styles/CommonHead';
import ProgressBar from '../components/styles/ProgressBar';
import {colors} from '../constants/colors';
import {screens} from '../constants/screens';
import {get_mock_question} from '../utils/api';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-6464114688925756~4549370474';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const MockTest = ({route}) => {
  const {id, category_name, type} = route?.params?.data;

  const {goBack, navigate} = useNavigation();
  const [data, setData] = useState([]);
  const [remainingTime, setRemainingTime] = useState();
  const [loader, setLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [rightAnswerCount, setRightAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [skipAnswerCount, setSkipAnswerCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [questionCompleted, setQuestionCompleted] = useState(false);

  const focus = useIsFocused();

  const [clickedCorrect, setClickedCorrect] = useState(false);
  const [clickedIncorrect, setClickedIncorrect] = useState(false);

  const animationCorrect = useRef(new Animated.Value(300)).current;
  const animationIncorrect = useRef(new Animated.Value(300)).current;

  const questionModel = useRef();
  const intervalRef = useRef();
  const andTestModel = useRef();

  useEffect(() => {
    if (
      rightAnswerCount + wrongAnswerCount + skipAnswerCount === data?.length &&
      data?.length !== 0
    ) {
      if (!questionCompleted) {
        questionModel?.current?.open();
      }
      setQuestionCompleted(true);
    }
  }, [
    rightAnswerCount,
    wrongAnswerCount,
    skipAnswerCount,
    data,
    questionCompleted,
  ]);

  useEffect(() => {
    if (!focus) {
      setLoaded(false);
    }
  }, [focus]);

  useEffect(() => {
    try {
      if (focus && !loaded) {
        const unsubscribeLoaded = rewarded.addAdEventListener(
          RewardedAdEventType.LOADED,
          () => {
            setLoaded(true);
            console.log('loaded', true);
          },
        );
        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            console.log('User earned reward of ', reward);
          },
        );

        rewarded.load();

        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
      }
    } catch (err) {
      console.log('err', err);
    }
  }, [loaded, focus]);

  const onSubmit = useCallback(() => {
    if (
      rightAnswerCount + wrongAnswerCount + skipAnswerCount ===
        data?.length - 1 &&
      data?.length !== 0
    ) {
      if (!questionCompleted) {
        questionModel?.current?.open();
      }
      setQuestionCompleted(true);
    } else {
      questionModel?.current?.close();
      // scoreModel?.current?.open();

      try {
        rewarded.show();
      } catch (err) {
        console.log('err', err);
      }

      andTestModel?.current?.close();
      navigate(screens.Score, {
        right: rightAnswerCount,
        wrong: wrongAnswerCount,
        total: data?.length,
        title: 'Result : ' + category_name,
        list: data,
      });
    }
  }, [
    rightAnswerCount,
    wrongAnswerCount,
    skipAnswerCount,
    data,
    questionCompleted,
  ]);

  const getData = useCallback(async () => {
    try {
      setLoader(true);
      const response = await get_mock_question(id);

      const newData = response?.response?.map(item => {
        // console.log(
        //   'first',
        //   item?.answer,
        //   item?.answer?.toString()?.toLowerCase() === 'a'
        //     ? item?.optiona
        //     : item?.answer?.toString()?.toLowerCase() === 'b'
        //     ? item?.optionb
        //     : item?.answer?.toString()?.toLowerCase() === 'c'
        //     ? item?.optionc
        //     : item?.optiond,
        // );
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

        return {
          ...item,
          user_answer: null,
          optiona: options[0],
          optionb: options[1],
          optionc: options[2],
          optiond: options[3],
          answer: answer,
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
    if (data?.length === 0 || questionCompleted) return;
    setRemainingTime(parseInt(data?.[currentIndex]?.duration));
  }, [data, currentIndex, questionCompleted]);

  useEffect(() => {
    if (data?.length === 0 || questionCompleted) return;
    intervalRef.current = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime <= 1000) {
          clearInterval(intervalRef.current);
          onNextHandler();
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [currentIndex, data, questionCompleted]);

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
      setData(prev =>
        prev?.map((ele, index) => {
          if (index === currentIndex) {
            return {...ele, user_answer: answer};
          }
          return ele;
        }),
      );
    },
    [currentIndex, data, selectedAnswer],
  );

  const onSubmitHandler = useCallback(() => {
    // questionModel?.current?.close();
    // scoreModel?.current?.open();

    try {
      rewarded.show();
    } catch (err) {
      console.log('err', err);
    }

    andTestModel?.current?.close();
    navigate(screens.Score, {
      right: rightAnswerCount,
      wrong: wrongAnswerCount,
      total: data?.length,
      title: 'Result : ' + category_name,
      list: data,
    });
  }, [rightAnswerCount, wrongAnswerCount, data, category_name]);

  const formatTime = milliseconds => {
    const seconds = Math.floor(milliseconds / 1000);
    return `${seconds} sec`;
  };

  const onEndTestModelOpen = useCallback(() => {
    andTestModel?.current?.open();
  }, []);

  const handlePressForCorrect = useCallback(() => {
    Animated.timing(animationCorrect, {
      toValue: -140,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(animationCorrect, {
          toValue: 300,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 1000);
    });
  }, []);

  const handlePressForIncorrect = () => {
    Animated.timing(animationIncorrect, {
      toValue: -140,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(animationIncorrect, {
          toValue: 300,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, 1000);
    });
  };

  return (
    <View style={styles.root}>
      <QuestionSubmitModel
        ref={questionModel}
        attempt={rightAnswerCount + wrongAnswerCount}
        total={data?.length}
        onSubmit={onSubmitHandler}
      />
      {/* <ScoreModel
        ref={scoreModel}
        right={rightAnswerCount}
        wrong={wrongAnswerCount}
        total={data?.length}
        title={'Result : ' + category_name}
      /> */}
      <TostModel
        ref={andTestModel}
        onPress={onSubmitHandler}
        title={'Confirm Test End'}
        message={
          "Are you sure you want to end the test here? All progress will be saved, but you won't be able to return and make any changes. Do you want to continue?"
        }
      />
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={category_name}
        extraHeight={33}>
        <Font600 style={styles.heading}>{formatTime(remainingTime)}</Font600>
        <View style={styles.headingContainer}>
          {/* <Pressable style={styles.headingButton}>
            <FastImage
              style={styles.gridIcon}
              source={images.drawer}
              resizeMode="contain"
            />
          </Pressable> */}
          <Pressable onPress={onEndTestModelOpen} style={styles.headingButton}>
            <Font600 style={styles.endTest}>{'End test'}</Font600>
          </Pressable>
        </View>
      </CommonHead>
      {/* showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        bounces={false} */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
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
          <View style={styles.markContainer}>
            <Animated.View
              style={[
                styles.markDetailContainer,
                {transform: [{translateX: animationCorrect}]},
              ]}>
              <Font500 style={styles.markDetail}>{'+2 For correct'}</Font500>
            </Animated.View>
            <Animated.View
              style={[
                styles.markDetailContainer,
                {transform: [{translateX: animationIncorrect}]},
              ]}>
              <Font500 style={styles.markDetail}>
                {'-0.5 For incorrect'}
              </Font500>
            </Animated.View>
            <Pressable onPress={handlePressForCorrect} style={styles.mark}>
              <Font400 style={styles.markText}>{'+2'}</Font400>
            </Pressable>
            <Pressable onPress={handlePressForIncorrect} style={styles.mark}>
              <Font400 style={styles.markText}>{'-0.5'}</Font400>
            </Pressable>
          </View>
          <View style={styles.questionContainer}>
            {data[currentIndex]?.question ? (
              <Font600 style={styles.questionTitle}>
                {data[currentIndex]?.question}
              </Font600>
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
                      ? selectedAnswer === ele
                        ? styles.rightAnswer
                        : null
                      : null,
                  ]}>
                  <View style={styles.answerTextContainer}>
                    <Font600 style={styles.answerText}>
                      {String.fromCharCode(65 + index) + '. ' + ele}
                    </Font600>
                  </View>
                  {/* {selectedAnswer ? (
                    <FastImage
                      source={
                        selectedAnswer === ele ? images.correct_answer : null
                      }
                      style={styles.icon}
                      resizeMode="contain"
                    />
                  ) : null} */}
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

      {rightAnswerCount + wrongAnswerCount + skipAnswerCount >= data?.length &&
      data?.length !== 0 ? (
        <Button onPress={onSubmit} buttonStyle={styles.submit}>
          {'Submit'}
        </Button>
      ) : null}

      <View
        style={{
          height: 52,
          justifyContent: 'center',
          backgroundColor: colors.white,
        }}>
        <BannerADs />
      </View>
    </View>
  );
};

export default memo(MockTest);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  heading: {
    top: 28,
    fontSize: 16,
    color: colors.white,
  },
  headingContainer: {
    flexDirection: 'row-reverse',
  },
  endTest: {
    color: colors.white,
  },
  headingButton: {
    height: 28,
    borderRadius: 6,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: colors.color125A92,
    marginHorizontal: 10,
  },
  gridIcon: {
    width: 16,
    height: 16,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  progressContainer: {
    marginTop: 10,
    marginHorizontal: 8,
  },
  markContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  markDetail: {
    fontSize: 12,
    color: colors.white,
  },
  markDetailContainer: {
    zIndex: 1,
    borderRadius: 4,
    paddingVertical: 2,
    position: 'absolute',
    paddingHorizontal: 10,
    backgroundColor: colors.color125A92,
    bottom: 4,
  },
  mark: {
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderColor: colors.transparent_black_40,
  },
  markText: {
    color: colors.transparent_black_40,
  },
  questionContainer: {
    // height: 173,
    marginTop: 12,
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
  },
  note: {
    fontSize: 14,
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
