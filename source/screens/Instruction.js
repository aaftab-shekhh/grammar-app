import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {images} from '../assets';
import {useNavigation} from '@react-navigation/native';
import CommonHead from '../components/styles/CommonHead';
import FastImage from 'react-native-fast-image';
import Font700 from '../components/font/Font700';
import Font400 from '../components/font/Font400';
import Font500 from '../components/font/Font500';
import {colors} from '../constants/colors';
import Button from '../components/styles/Button';
import {screens} from '../constants/screens';

const Instruction = ({route}) => {
  const route_data = route?.params?.data;
  const {category_name, questions, total_duration, instructions} = route_data;

  const {navigate} = useNavigation();

  const {goBack} = useNavigation();

  function convertMilliseconds(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    if (hours > 0) {
      return `${hours} hr, ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  }

  const onNavigateMockTest = useCallback(() => {
    navigate(screens.MockTest, {data: route_data});
  }, [route_data]);

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={category_name}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <FastImage
            style={styles.mockIcon}
            resizeMode="contain"
            source={images.mock}
          />
          <Font700 style={styles.title}>{category_name}</Font700>
        </View>
        <View style={styles.testDetailContainer}>
          <View style={styles.testDetails}>
            <Font700 style={styles.testValue}>{questions}</Font700>
            <Font500 style={styles.testLabel}>{'Question'}</Font500>
          </View>
          <View style={styles.line} />
          <View style={styles.testDetails}>
            <Font700 style={styles.testValue}>
              {convertMilliseconds(total_duration)}
            </Font700>
            <Font500 style={styles.testLabel}>{'Duration'}</Font500>
          </View>
          <View style={styles.line} />
          <View style={styles.testDetails}>
            <Font700 style={styles.testValue}>{+questions * 2}</Font700>
            <Font500 style={styles.testLabel}>{'Marks'}</Font500>
          </View>
        </View>
        <View style={styles.instructionContainer}>
          {instructions
            ? Object.values(instructions).map((instruction, index) => (
                <Font400 key={index} style={styles.instructionText}>
                  {instruction}
                </Font400>
              ))
            : null}
        </View>
        <Button onPress={onNavigateMockTest} buttonStyle={styles.button}>
          {'Start'}
        </Button>
      </ScrollView>
    </View>
  );
};

export default memo(Instruction);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mockIcon: {
    width: 100,
    height: 100,
  },
  title: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 12,
  },
  testDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  testDetails: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  testValue: {
    paddingBottom: 10,
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: colors.color616161,
  },
  instructionContainer: {
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  instructionText: {
    paddingBottom: 10,
  },
  button: {
    height: 48,
    marginHorizontal: 24,
    marginTop: 30,
    marginBottom: 20,
  },
});
