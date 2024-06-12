import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import Font600 from '../components/font/Font600';
import CommonHead from '../components/styles/CommonHead';
import {colors} from '../constants/colors';
import Font700 from '../components/font/Font700';
import Font800 from '../components/font/Font800';
import Font400 from '../components/font/Font400';
import FastImage from 'react-native-fast-image';
import {deviceWidth} from '../constants/constants';
import Button from '../components/styles/Button';

const LearnWithImages = ({route}) => {
  const set_no = route?.params?.set_no;

  const {goBack} = useNavigation();

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
        <View style={styles.titleContainer}>
          <Font700 style={styles.title}>{'God’s Acre'}</Font700>
        </View>
        <View style={styles.meaningContainer}>
          <Font800 style={styles.meaningTitle}>{'Meaning : '}</Font800>
          <Font400 style={styles.meaningContent}>
            {'Cemetery, Adjacent to the Church'}
          </Font400>
        </View>
        <View style={styles.meaningContainer}>
          <Font800 style={styles.meaningTitle}>{'Sentence : '}</Font800>
          <Font400 style={styles.meaningContent}>
            {'An area adjacent to a cemetery is called god’s acre'}
          </Font400>
        </View>
        <FastImage
          source={images.imageQuestion}
          resizeMode={'cover'}
          style={styles.image}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button iconStyle={styles.buttonIcon} icon={images.arrow_left}>
          {'Prev'}
        </Button>
        <Button
          iconStyle={styles.buttonIcon}
          buttonStyle={styles.next}
          icon={images.arrow_right}>
          {'Next'}
        </Button>
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

export default memo(LearnWithImages);

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
  titleContainer: {
    height: 45,
    elevation: 4,
    marginTop: 24,
    shadowRadius: 4,
    borderRadius: 12,
    marginBottom: 16,
    shadowOpacity: 0.1,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {height: 1, width: 0},
    backgroundColor: colors.color89C6F0,
  },
  title: {
    fontSize: 18,
  },
  meaningContainer: {
    elevation: 4,
    shadowRadius: 4,
    marginBottom: 16,
    borderRadius: 12,
    shadowOpacity: 0.2,
    paddingVertical: 24,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {height: 2, width: 1},
  },
  meaningTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  meaningContent: {
    fontSize: 16,
  },
  image: {
    height: 188,
    marginTop: 32,
    borderRadius: 16,
    alignSelf: 'center',
    width: deviceWidth - 16,
  },
  buttonIcon: {
    height: 24,
    width: 24,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    bottom: 52,
    width: '100%',
  },
  next: {
    flexDirection: 'row-reverse',
  },
});
