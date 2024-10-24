import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {BackHandler, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../assets';
import CourseListing from '../components/list/CourseListing';
import ImageSlider from '../components/list/ImageSlider';
import LanguageChoiceModel from '../components/model/LanguageChoiceModel';
import LogoModel from '../components/model/LogoModel';
import RatingModel from '../components/model/RatingModel';
import TostModel from '../components/model/TostModel';
import CommonHead from '../components/styles/CommonHead';
import {screens} from '../constants/screens';

const Home = () => {
  const {navigate} = useNavigation();
  const modelRef = useRef();
  const languageModelRef = useRef();
  const leaveRef = useRef();
  const exitRef = useRef();

  const focus = useIsFocused();

  const user = useSelector(state => state?.auth);
  const decline_to_rating = useSelector(
    state => state?.auth?.decline_to_rating,
  );

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

  useEffect(() => {
    if (!focus) {
      return;
    }

    const backAction = () => {
      if (decline_to_rating) {
        exitRef?.current?.open();
      } else {
        leaveRef?.current?.open();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [focus, decline_to_rating]);

  return (
    <View style={styles.root}>
      <LogoModel onClose={onCloseModelHandler} ref={modelRef} />
      <TostModel
        ref={exitRef}
        title={'Leave the App?'}
        message={'Are you sure you want to leave the app?'}
        onPress={() => {
          BackHandler.exitApp();
          exitRef?.current?.close();
        }}
      />
      <RatingModel
        onShowExit={() => {
          exitRef?.current?.open();
        }}
        ref={leaveRef}
      />
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
