import {
  BackHandler,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import Font400 from '../font/Font400';
import Font700 from '../font/Font700';
import Button from '../styles/Button';
import {colors} from '../../constants/colors';
import {useFocusEffect} from '@react-navigation/native';

const RatingModel = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => setVisible(false), []);

  useImperativeHandle(
    ref,
    () => {
      return {open: () => setVisible(true), close: close};
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          setVisible(false);
          close();
          setVisible(false);
          return true;
        } else {
          return true;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [visible]),
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <Pressable onPress={close} style={styles.model}>
        <Pressable onPress={() => {}} style={styles.content}>
          <Font700 style={styles.title}>{'We need your help!'}</Font700>
          <Font400 style={styles.message}>
            {
              'If you like our app, please support us and rate on Google Play Market'
            }
          </Font400>
          <Button buttonStyle={styles.button}>{'Sure, I Like It!'}</Button>
          <Button
            textStyle={styles.buttonText}
            buttonStyle={[styles.button, styles.whiteButton]}>
            {'Maybe Later'}
          </Button>
          <Button
            textStyle={styles.buttonText}
            buttonStyle={[
              styles.button,
              styles.whiteButton,
            ]}>{`I Don't Like It`}</Button>
        </Pressable>
      </Pressable>
    </Modal>
  );
});

export default memo(RatingModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent_black_40,
  },
  content: {
    width: '80%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    marginBottom: 20,
    color: colors.color616161,
  },
  button: {
    marginBottom: 20,
  },
  whiteButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
  },
  buttonText: {
    color: colors.black,
  },
});