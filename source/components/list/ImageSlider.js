import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {colors} from '../../constants/colors';

const ImageSlider = () => {
  return <View style={styles.imageSliderContainer}></View>;
};

export default memo(ImageSlider);

const styles = StyleSheet.create({
  imageSliderContainer: {
    height: 171,
    marginTop: 9,
    backgroundColor: colors.color113251,
  },
});
