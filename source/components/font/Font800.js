import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../../constants/colors';

const Font800 = ({children, style, numberOfLines}) => {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.font, style]}>
      {children}
    </Text>
  );
};

export default memo(Font800);

const styles = StyleSheet.create({
  font: {
    fontFamily: 'NunitoSans_10pt-ExtraBold',
    fontSize: 16,
    color: colors.black,
    includeFontPadding: false,
  },
});
