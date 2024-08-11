import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CourseListing from '../components/list/CourseListing';
import ImageSlider from '../components/list/ImageSlider';
import CommonHead from '../components/styles/CommonHead';
import {images} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {screens} from '../constants/screens';
import LanguageChoiceModel from '../components/model/LanguageChoiceModel';
import LogoModel from '../components/model/LogoModel';
import {useSelector} from 'react-redux';

const Home = () => {
  const {navigate} = useNavigation();
  const modelRef = useRef();
  const languageModelRef = useRef();

  const user = useSelector(state => state?.auth);

  useEffect(() => {
    modelRef?.current?.open();
  }, []);

  const onCloseModelHandler = useCallback(() => {
    if (!user?.user?.language) languageModelRef?.current?.open();
  }, [user]);

  const onNavigateSetting = useCallback(() => navigate(screens.Settings), []);

  const onOpenModelHandler = useCallback(
    () => languageModelRef?.current?.open(),
    [],
  );

  return (
    <View style={styles.root}>
      <LogoModel onClose={onCloseModelHandler} ref={modelRef} />
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
