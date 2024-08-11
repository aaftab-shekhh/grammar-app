import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../../constants/colors';

const Font600 = ({children, style}) => {
  return <Text style={[styles.font, style]}>{children}</Text>;
};

export default memo(Font600);

const styles = StyleSheet.create({
  font: {
    fontFamily: 'NunitoSans_10pt-SemiBold',
    fontSize: 16,
    color: colors.black,
    includeFontPadding: false,
  },
});
