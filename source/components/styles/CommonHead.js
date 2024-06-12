import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Font400 from '../font/Font400';
import FastImage from 'react-native-fast-image';

const CommonHead = props => {
  const {rightIcon, leftIcon, onPressRight, onPressLeft, leftIconStyle} = props;

  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.root, {height: top + 78, paddingTop: top}]}>
      <View style={styles.container}>
        {leftIcon ? (
          <Pressable
            onPress={onPressLeft}
            style={[styles.button, styles.leftButton]}>
            <FastImage
              style={[styles.icon, leftIconStyle]}
              source={leftIcon}
              resizeMode="contain"
            />
          </Pressable>
        ) : (
          <></>
        )}
        <Font400 style={styles.title}>{'Englivia'}</Font400>
        {rightIcon ? (
          <Pressable
            onPress={onPressRight}
            style={[styles.button, styles.rightButton]}>
            <FastImage
              style={[styles.icon, rightIcon]}
              source={rightIcon}
              resizeMode="contain"
            />
          </Pressable>
        ) : (
          <></>
        )}
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
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color125A92,
  },
  rightButton: {position: 'absolute', right: 0},
  leftButton: {position: 'absolute', left: 0},
  icon: {
    height: 24,
    width: 24,
  },
  circle: {
    borderRadius: 50,
    opacity: 0.1,
    position: 'absolute',
  },
  title: {
    flex: 1,
    textAlign: 'center',
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
