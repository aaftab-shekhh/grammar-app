import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Font400 from '../font/Font400';

const CommonHead = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.root, {height: top + 78, paddingTop: top}]}>
      <View style={styles.container}>
        <Pressable style={styles.button}></Pressable>
        <Font400 style={styles.title}>{'Englivia'}</Font400>
        <Pressable style={styles.button}></Pressable>
      </View>
      <LinearGradient
        colors={['#ffffff', '#ffffff00']}
        style={[styles.circle, styles.circle2]}
      />
      <LinearGradient
        colors={['#ffffff', '#ffffff00']}
        style={[styles.circle, styles.circle1]}
      />
    </View>
  );
};

export default memo(CommonHead);

const styles = StyleSheet.create({
  root: {
    height: 78,
    overflow: 'hidden',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.color113251,
  },

  button: {
    height: 36,
    width: 36,
    borderRadius: 10,
    backgroundColor: colors.color125A92,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 50,
    opacity: 0.1,
    position: 'absolute',
  },
  title: {
    fontSize: 18,
    color: colors.white,
  },
  circle1: {
    zIndex: -1,
    height: 100,
    width: 100,
    top: -10,
    right: -21,
  },
  circle2: {
    height: 50,
    width: 50,
    top: 40,
    left: 77,
  },
});
