import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Font700 from '../font/Font700';
import {colors} from '../../constants/colors';
import FastImage from 'react-native-fast-image';

const Button = props => {
  const {children, buttonStyle, textStyle, iconStyle, icon} = props;

  return (
    <Pressable style={[styles.button, buttonStyle]}>
      <FastImage style={iconStyle} source={icon} resizeMode="contain" />
      <Font700 style={[styles.textStyle, textStyle]}>{children}</Font700>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 41,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: colors.color113251,
  },
  textStyle: {
    fontSize: 16,
    color: colors.white,
  },
});
