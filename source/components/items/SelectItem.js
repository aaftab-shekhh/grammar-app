import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';
import {colors} from '../../constants/colors';
import Font700 from '../font/Font700';

const SelectItem = ({onPress, title, subTitle, style, data}) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, style]}>
      <FastImage
        source={images.item_bg_cover_image}
        resizeMode="contain"
        style={styles.bgImage}>
        <FastImage
          source={images.course_white_icon}
          resizeMode="contain"
          style={styles.icon}
        />
      </FastImage>
      {title ? <Font700 style={styles.title}>{title}</Font700> : null}
      {data?.subcategory_name ? (
        <Font700 style={styles.title}>{data?.subcategory_name}</Font700>
      ) : null}
      {subTitle ? <Font700 style={styles.subTitle}>{subTitle}</Font700> : null}
    </Pressable>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  root: {
    height: 72,
    elevation: 4,
    borderRadius: 7,
    shadowRadius: 1,
    borderWidth: 0.5,
    shadowOpacity: 0.1,
    justifyContent: 'center',
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {height: 2, width: 2},
    borderColor: colors.transparent_black_10,
  },
  title: {
    fontSize: 16,
    paddingLeft: 100,
  },
  subTitle: {
    fontSize: 12,
    paddingLeft: 100,
  },
  icon: {
    width: 47,
    left: 15,
    height: 47,
    position: 'absolute',
  },
  bgImage: {
    left: 0,
    width: 100,
    height: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
