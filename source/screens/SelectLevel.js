import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {images} from '../assets';
import SelectItem from '../components/items/SelectItem';
import CommonHead from '../components/styles/CommonHead';
import {screens} from '../constants/screens';

const SelectLevel = ({route}) => {
  const {goBack} = useNavigation();

  const route_data = route?.params;

  const {navigate} = useNavigation();

  const onNavigateSetForImage = useCallback(() => {
    navigate(screens.SelectSet, {
      ...route_data,
      screens_form: screens.LearnWithImages,
    });
  }, [route_data]);

  const onNavigateSetForQuiz = useCallback(() => {
    navigate(screens.SelectSet, {
      ...route_data,
      screens_form: screens.LearnWithQuiz,
    });
  }, [route_data]);

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
