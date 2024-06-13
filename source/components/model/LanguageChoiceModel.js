import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {BackHandler, Modal, Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';
import Font700 from '../font/Font700';
import Font400 from '../font/Font400';
import {useFocusEffect} from '@react-navigation/native';

const LanguageChoiceModel = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setVisible(false), []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isOpen) {
          setIsOpen(false);
          close();
          setIsOpen(false);
          return true;
        } else {
          return true;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isOpen]),
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
          <View style={styles.heading}>
            <Font700 style={styles.title}>
              {'Select Your Mode Of Study'}
            </Font700>
          </View>
          <View style={styles.languageChoiceContainer}>
            <Pressable
              onPress={setSelected.bind(null, 0)}
              style={styles.languageChoice}>
              <Font400 style={styles.text}>
                {'English + Bengali Mode Study'}
              </Font400>
              <View style={styles.radioButton}>
                {selected === 0 ? <View style={styles.selector} /> : null}
              </View>
            </Pressable>
            <Pressable
              onPress={setSelected.bind(null, 1)}
              style={styles.languageChoice}>
              <Font400 style={styles.text}>
                {'English + Hindi Mode Study'}
              </Font400>
              <View style={styles.radioButton}>
                {selected === 1 ? <View style={styles.selector} /> : null}
              </View>
            </Pressable>
            <Pressable
              onPress={setSelected.bind(null, 2)}
              style={styles.languageChoice}>
              <Font400 style={styles.text}>{'English Mode Study'}</Font400>
              <View style={styles.radioButton}>
                {selected === 2 ? <View style={styles.selector} /> : null}
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});

export default memo(LanguageChoiceModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.transparent_black_40,
  },
  container: {
    borderRadius: 8,
    marginHorizontal: 9,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.white,
  },
  heading: {
    height: 39,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: colors.color125A92,
  },
  title: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  languageChoiceContainer: {
    marginHorizontal: 28,
    marginBottom: 20,
  },
  languageChoice: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: 12,
    paddingBottom: 6,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.black,
  },
  selector: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
});
