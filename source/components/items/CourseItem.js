import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../../constants/colors';
import {deviceWidth} from '../../constants/constants';
import {screens} from '../../constants/screens';
import Font700 from '../font/Font700';

const CourseItem = ({data}) => {
  const {category_name, image, language_id, id} = data;

  const {navigate} = useNavigation();

  const onNavigateSelect = useCallback(() => {
    navigate(screens.SelectLevel, {language_id: language_id, category_id: id});
  }, [navigate, language_id, id]);

  return (
    <Pressable onPress={onNavigateSelect} style={styles.root}>
      <FastImage
        style={styles.iconStyle}
        source={{uri: image}}
        resizeMode="contain"
      />
      <Font700 numberOfLines={3} style={styles.title}>
        {category_name}
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
