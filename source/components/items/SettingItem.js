import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import Font600 from '../font/Font600';
import FastImage from 'react-native-fast-image';
import {colors} from '../../constants/colors';

const SettingItem = ({onPress, title, icon}) => {
  return (
    <Pressable style={styles.root} onPress={onPress}>
      <FastImage source={icon} resizeMode="contain" style={styles.icon} />
      <Font600 style={styles.title}>{title}</Font600>
    </Pressable>
  );
};

export default memo(SettingItem);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginHorizontal: 4,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  icon: {
    height: 33,
    width: 33,
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 12,
    color: colors.color616161,
  },
});
