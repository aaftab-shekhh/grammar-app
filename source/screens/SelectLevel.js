import React, {memo, useCallback} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import CommonHead from '../components/styles/CommonHead';
import {useNavigation} from '@react-navigation/native';
import Font700 from '../components/font/Font700';
import {colors} from '../constants/colors';
import {screens} from '../constants/screens';
import FastImage from 'react-native-fast-image';
import SelectItem from '../components/items/SelectItem';

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
        <SelectItem
          style={styles.item}
          onPress={onNavigateSetForImage}
          title={'Learn with Images'}
        />
        <SelectItem
          style={styles.item}
          onPress={onNavigateSetForQuiz}
          title={'Quiz with Definitions'}
        />
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
  item: {
    marginBottom: 8,
  },
});
