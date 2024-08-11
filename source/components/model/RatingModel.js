import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Linking, Modal, Pressable, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import Font400 from '../font/Font400';
import Font700 from '../font/Font700';
import Button from '../styles/Button';

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
          <Button
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.englivia.quiz',
              )
            }
            buttonStyle={styles.button}>
            {'Sure, I Like It!'}
          </Button>
          <Button
            onPress={close}
            textStyle={styles.buttonText}
            buttonStyle={[styles.button, styles.whiteButton]}>
            {'Maybe Later'}
          </Button>
          <Button
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.englivia.quiz',
              )
            }
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
