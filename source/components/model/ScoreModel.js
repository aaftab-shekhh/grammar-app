import {useNavigation} from '@react-navigation/native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../../constants/colors';
import Font400 from '../font/Font400';
import Font600 from '../font/Font600';

const ScoreModel = forwardRef(({title, right, wrong, total}, ref) => {
  const [visible, setVisible] = useState(false);

  const {goBack} = useNavigation();

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        close();
      }, 3000);
    }
  }, [visible]);

  const close = useCallback(() => {
    goBack();
    setVisible(false);
  }, []);

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
          <Font600 style={styles.title}>{title}</Font600>
          <View style={styles.detail}>
            <View style={styles.cardContainer}>
              <Font600 style={styles.card}>{'Scorecard'}</Font600>
            </View>
            <View style={styles.scoreContainer}>
              <View style={styles.scoreDetail}>
                <Font600 style={styles.right}>{right + '/'}</Font600>
                <Font400 style={styles.total}>{total}</Font400>
              </View>
              <Font400 style={styles.scoreContainerText}>
                {'Total Marks'}
              </Font400>
            </View>
            <View style={styles.footer}>
              <Font400 style={styles.correct}>{right + ' correct'}</Font400>
              <View style={styles.line} />
              <Font400 style={styles.incorrect}>{wrong + ' incorrect'}</Font400>
              <View style={styles.line} />
              <Font400 style={styles.unattempted}>
                {total - (right + wrong) + ' unattempted'}
              </Font400>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
});

export default memo(ScoreModel);

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
  },
  detail: {
    paddingVertical: 24,
  },
  cardContainer: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  card: {
    fontSize: 20,
  },
  scoreContainer: {
    marginVertical: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreDetail: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  right: {
    fontSize: 36,
  },
  total: {
    fontSize: 20,
    bottom: 4,
  },
  scoreContainerText: {
    marginTop: 10,
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  correct: {
    color: colors.color2F7C01,
    fontSize: 16,
  },
  line: {
    width: 1,
    height: 12,
    backgroundColor: colors.black,
  },
  incorrect: {
    color: colors.colorF90000,
    fontSize: 16,
  },
  unattempted: {
    color: colors.color616161,
    fontSize: 16,
  },
});
