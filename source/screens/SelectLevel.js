import React, {memo, useCallback} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import CommonHead from '../components/styles/CommonHead';
import {useNavigation} from '@react-navigation/native';
import Font700 from '../components/font/Font700';
import {colors} from '../constants/colors';
import {screens} from '../constants/screens';

const SelectLevel = () => {
  const {goBack} = useNavigation();

  const {navigate} = useNavigation();

  const onNavigateSetForImage = useCallback(() => {
    navigate(screens.SelectSet, {screens_form: screens.LearnWithImages});
  }, []);

  const onNavigateSetForQuiz = useCallback(() => {
    navigate(screens.SelectSet, {screens_form: screens.LearnWithQuiz});
  }, []);

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={'Select Level'}
      />
      <View style={styles.content}>
        <Pressable onPress={onNavigateSetForImage} style={styles.levelItem}>
          <Font700 style={styles.titleOfItem}>{'Learn with Images'}</Font700>
        </Pressable>
        <Pressable onPress={onNavigateSetForQuiz} style={styles.levelItem}>
          <Font700 style={styles.titleOfItem}>
            {'Quiz with Definitions'}
          </Font700>
        </Pressable>
      </View>
    </View>
  );
};

export default memo(SelectLevel);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    marginTop: 32,
    marginHorizontal: 8,
  },
  levelItem: {
    height: 72,
    marginBottom: 8,
    borderRadius: 7,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {height: 2, width: 2},
    borderWidth: 0.5,
    borderColor: colors.transparent_black_10,
  },
  titleOfItem: {
    fontSize: 16,
    paddingLeft: 8,
  },
});
