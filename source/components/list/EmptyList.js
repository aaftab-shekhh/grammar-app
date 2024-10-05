import React, {memo} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {images} from '../../assets';
import {colors} from '../../constants/colors';
import Font700 from '../font/Font700';

const EmptyList = props => {
  const {loader, message, tintColor} = props;

  return (
    <View style={styles.root}>
      <Image
        tintColor={tintColor ? tintColor : colors.color125A92}
        source={images.empty}
        resizeMode="contain"
        style={styles.image}
      />
      <Font700
        style={[
          styles.text,
          {color: tintColor ? tintColor : colors.color125A92},
        ]}>
        {loader ? 'Loading...' : message}
      </Font700>
    </View>
  );
};

export default memo(EmptyList);

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 2,
  },
  image: {
    height: 60,
    width: 60,
  },
  text: {
    fontSize: 14,
    paddingVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
