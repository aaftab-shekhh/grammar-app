import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../../constants/colors';

const Font700 = ({children, style, numberOfLines}) => {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.font, style]}>
      {children}
    </Text>
  );
};

export default Font700;

const styles = StyleSheet.create({
  font: {
    fontWeight: 700,
    fontSize: 16,
    color: colors.black,
    includeFontPadding: false,
  },
});
