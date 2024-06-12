import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {deviceWidth} from '../../constants/constants';
import {colors} from '../../constants/colors';
import Font700 from '../font/Font700';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';

const CourseItem = ({data}) => {
  const {title} = data;

  return (
    <View style={styles.root}>
      <FastImage
        style={styles.iconStyle}
        source={images.course_blue_icon}
        resizeMode="contain"
      />
      <Font700 numberOfLines={3} style={styles.title}>
        {title}
      </Font700>
    </View>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    alignItems: 'center',
    width: (deviceWidth - 16) / 3,
    backgroundColor: colors.white,
    height: (deviceWidth - 16) / 3,
    borderColor: colors.transparent_white_10,
    shadowOffset: {height: 2, width: 0},
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  iconStyle: {
    width: 41,
    height: 41,
    marginTop: 8,
  },
  title: {
    flex: 1,
    fontSize: 12,
    marginTop: 11,
    textAlign: 'center',
    paddingHorizontal: 5,
    color: colors.color616161,
  },
});
