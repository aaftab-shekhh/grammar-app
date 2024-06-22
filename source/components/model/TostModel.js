import {useFocusEffect} from '@react-navigation/native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {BackHandler, Modal, Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';
import Font600 from '../font/Font600';
import Button from '../styles/Button';

const TostModel = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => setVisible(false), []);

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

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setVisible(true),
        close: close,
      };
    },
    [close],
  );

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade">
      <Pressable onPress={close} style={styles.model}>
        <Pressable onPress={() => {}} style={styles.container}>
          <Font600 style={styles.title}>
            {'Are you sure you want to Submit?'}
          </Font600>
          <View style={styles.detail}></View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={close}
              buttonStyle={[styles.button, styles.cancelButton]}
              textStyle={styles.cancelButtonText}>
              {'Cancel'}
            </Button>
            <Button onPress={close} buttonStyle={styles.button}>
              {'Submit'}
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});

export default memo(TostModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.transparent_black_40,
  },
  container: {
    padding: 18,
    borderRadius: 8,
    marginHorizontal: 9,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  detail: {
    paddingVertical: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
  cancelButton: {
    marginRight: 18,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
    opacity: 0.2,
  },
  cancelButtonText: {
    color: colors.color113251,
  },
});
