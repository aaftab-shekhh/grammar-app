import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../assets';
import Font400 from '../components/font/Font400';
import Font600 from '../components/font/Font600';
import Font700 from '../components/font/Font700';
import Font800 from '../components/font/Font800';
import CommonHead from '../components/styles/CommonHead';
import {colors} from '../constants/colors';
import {deviceWidth} from '../constants/constants';
import {screens} from '../constants/screens';

const QuestionItem = ({data}) => {
  const {question, answer, index} = data;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const paddingValue = useRef(new Animated.Value(0)).current;
  const translateValue = useRef(new Animated.Value(deviceWidth)).current;
  const [show, isShow] = useState(false);

  const rotateIcon = useCallback(() => {
    Animated.timing(rotateValue, {
      toValue: show ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateValue, {
      toValue: show ? deviceWidth : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(paddingValue, {
      toValue: show ? 0 : 40,
      duration: 500,
      useNativeDriver: false,
    }).start();

    isShow(prev => !prev);
  }, [show]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '270deg'],
  });

  return (
    <Animated.View style={[styles.questionItem, {paddingBottom: paddingValue}]}>
      <View style={styles.questionContainer}>
        <Font600 style={styles.questionNumber}>
          {'Q' + (index + 1)?.toString()}
        </Font600>
        <Font600 style={styles.question}>{question}</Font600>
        <Animated.View style={{transform: [{rotate}]}}>
          <Pressable onPress={rotateIcon}>
            <FastImage
              style={styles.dropIcon}
              source={images.dropIcon}
              resizeMode="contain"
            />
          </Pressable>
        </Animated.View>
      </View>
      <Animated.View
        style={[
          {
            transform: [{translateX: translateValue}],
          },
        ]}>
        <Font700 style={styles.answer}>{'Answer : ' + answer}</Font700>
      </Animated.View>
    </Animated.View>
  );
};

const Score = ({route}) => {
  const {title, right, wrong, total, list} = route?.params;
  const [selected, setSelected] = useState('Scorecard');
  const translateValue = useRef(new Animated.Value(0)).current;

  const handleTabPress = useCallback(() => {
    Animated.timing(translateValue, {
      toValue: selected === 'Solution' ? (deviceWidth - 34) / 2 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  useEffect(() => {
    handleTabPress();
  }, [selected]);

  const {navigate} = useNavigation();

  const renderItemHandler = useCallback(({item, index}) => {
    return <QuestionItem data={{...item, index: index}} />;
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log('"first"', 'first');
        navigate.bind(null, screens.SelectMock, {
          category_name: 'SSC PYQ Test',
          type: '4',
        });
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const marks = right * 2 - wrong * 0.5;

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={navigate.bind(null, screens.SelectMock, {
          category_name: 'SSC PYQ Test',
          type: '4',
        })}
        title={title}
      />
      <View style={styles.tabContainer}>
        <Animated.View
          style={[
            styles.floatingView,
            {
              transform: [{translateX: translateValue}],
            },
          ]}
        />
        <Pressable
          onPress={setSelected?.bind(null, 'Scorecard')}
          style={styles.tab}>
          <Font600 style={styles.option}>{'Scorecard'}</Font600>
        </Pressable>
        <Pressable
          onPress={setSelected?.bind(null, 'Solution')}
          style={styles.tab}>
          <Font600 style={styles.option}>{'Solution'}</Font600>
        </Pressable>
      </View>
      {selected === 'Scorecard' ? (
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Font600 style={styles.card}>{'Scorecard'}</Font600>
          </View>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreDetail}>
              <Font600 style={styles.right}>{marks + '/'}</Font600>
              <Font400 style={styles.total}>{total * 2}</Font400>
            </View>
            <Font400 style={styles.scoreContainerText}>{'Total Marks'}</Font400>
          </View>
          <View style={styles.footer}>
            <Font400 style={styles.correct}>{right + ' correct'}</Font400>
            <View style={styles.line} />
            <Font400 style={styles.incorrect}>{wrong + ' incorrect'}</Font400>
            <View style={styles.line} />
            <Font400 style={styles.unattempted}>
              {total - (right + wrong) + ' unattempted'}
            </Font400>
          </View>
        </View>
      ) : (
        <View style={styles.comingSoonContainer}>
          {/* <FlatList
            data={list}
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 20,
              paddingBottom: 120,
            }}
            ItemSeparatorComponent={
              <View
                style={{
                  height: 5,
                  backgroundColor: colors.transparent_black_10,
                }}
              />
            }
            renderItem={renderItemHandler}
            showsVerticalScrollIndicator={false}
            key={(_, index) => index?.toString()}
          /> */}
          <Font800 style={styles.comingSoon}>{'Coming Soon'}</Font800>
        </View>
      )}
    </View>
  );
};

export default memo(Score);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.color113251,
    marginTop: 20,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  tab: {
    flex: 1,
    height: 48,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingView: {
    // zIndex: 1,
    height: 48,
    margin: 5,
    borderRadius: 8,
    position: 'absolute',
    width: (deviceWidth - 34) / 2,
    backgroundColor: colors.color125A92,
  },
  option: {
    fontSize: 18,
    color: colors.white,
  },
  container: {
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 9,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.white,
    borderColor: colors.color616161,
  },
  title: {
    fontSize: 20,
  },
  detail: {
    paddingVertical: 24,
  },
  cardContainer: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  card: {
    fontSize: 20,
  },
  scoreContainer: {
    marginVertical: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreDetail: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  right: {
    fontSize: 36,
  },
  total: {
    fontSize: 20,
    bottom: 4,
  },
  scoreContainerText: {
    marginTop: 10,
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  correct: {
    color: colors.color2F7C01,
    fontSize: 16,
  },
  line: {
    width: 1,
    height: 12,
    backgroundColor: colors.black,
  },
  incorrect: {
    color: colors.colorF90000,
    fontSize: 16,
  },
  unattempted: {
    color: colors.color616161,
    fontSize: 16,
  },
  list: {
    flex: 1,
    marginVertical: 20,
  },
  questionItem: {
    paddingTop: 10,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'flex-start',
  },
  questionNumber: {
    fontSize: 18,
  },
  question: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dropIcon: {
    height: 24,
    width: 24,
  },
  answer: {
    top: 20,
    paddingHorizontal: 54,
  },
  comingSoonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoon: {
    fontSize: 38,
    paddingBottom: 100,
    textAlign: 'center',
    paddingHorizontal: 100,
    color: colors.color113251,
  },
});
