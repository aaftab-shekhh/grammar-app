import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {deviceWidth} from '../../constants/constants';
import {colors} from '../../constants/colors';
import Font700 from '../font/Font700';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {screens} from '../../constants/screens';

const CourseItem = ({data}) => {
  const {title} = data;

  const {navigate} = useNavigation();

  const onNavigateSelect = useCallback(() => {
    navigate(screens.SelectLevel);
  }, [navigate]);

  return (
    <Pressable onPress={onNavigateSelect} style={styles.root}>
      <FastImage
        style={styles.iconStyle}
        source={images.course_blue_icon}
        resizeMode="contain"
      />
      <Font700 numberOfLines={3} style={styles.title}>
        {title}
      </Font700>
    </Pressable>
  );
};

export default memo(CourseItem);

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    width: (deviceWidth - 16) / 3,
    height: (deviceWidth - 16) / 3,
    borderColor: colors.transparent_black_10,
  },
  iconStyle: {
    width: 41,
    height: 41,
  },
  title: {
    fontSize: 12,
    marginTop: 11,
    textAlign: 'center',
    paddingHorizontal: 5,
    color: colors.color616161,
  },
});
