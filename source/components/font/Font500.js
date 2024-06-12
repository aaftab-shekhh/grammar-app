import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../../constants/colors';

const Font500 = ({children, style}) => {
  return <Text style={[styles.font, style]}>{children}</Text>;
};

export default Font500;

const styles = StyleSheet.create({
  font: {
    fontWeight: 500,
    fontSize: 16,
    color: colors.black,
    includeFontPadding: false,
  },
});
