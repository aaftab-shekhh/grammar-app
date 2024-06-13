import React, {memo, useCallback, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CourseListing from '../components/list/CourseListing';
import ImageSlider from '../components/list/ImageSlider';
import CommonHead from '../components/styles/CommonHead';
import {images} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {screens} from '../constants/screens';
import LanguageChoiceModel from '../components/model/LanguageChoiceModel';

const Home = () => {
  const {navigate} = useNavigation();

  const languageModelRef = useRef();

  const onNavigateSetting = useCallback(() => navigate(screens.Settings), []);

  const onOpenModelHandler = useCallback(
    () => languageModelRef?.current?.open(),
    [],
  );

  return (
    <View style={styles.root}>
      <CommonHead
        onPressLeft={onNavigateSetting}
        leftIcon={images.drawer}
        rightIcon={images.language}
        onPressRight={onOpenModelHandler}
        title={'Englivia'}
      />
      <LanguageChoiceModel ref={languageModelRef} />
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}>
        <ImageSlider />
        <CourseListing />
      </ScrollView>
    </View>
  );
};

export default memo(Home);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {flexGrow: 1},
});
