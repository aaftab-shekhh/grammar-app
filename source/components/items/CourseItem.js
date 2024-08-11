import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../../constants/colors';
import {deviceWidth} from '../../constants/constants';
import {screens} from '../../constants/screens';
import Font700 from '../font/Font700';
import {images} from '../../assets';

const CourseItem = ({data}) => {
  const {category_name, type} = data;

  const {navigate} = useNavigation();

  const onNavigateSelect = useCallback(() => {
    if (type === '2') {
      navigate(screens.SelectLevel, {
        ...data,
      });
    } else if (type === '1') {
      navigate(screens.SelectSet, {
        ...data,
        screens_form: screens.LearnWithQuiz,
      });
    } else if (type === '3') {
      navigate(screens.SelectSet, {
        ...data,
        type: '3',
      });
    } else if (type === '3') {
      navigate(screens.SelectMock, {
        ...data,
        type: '4',
      });
    } else {
      navigate(screens.CurrentAffairs, {
        ...data,
        type: '5',
      });
    }
  }, [data]);

  return (
    <Pressable onPress={onNavigateSelect} style={styles.root}>
      <FastImage
        style={styles.iconStyle}
        source={images.course_blue_icon}
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
    flex: 1,
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
