import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {deviceWidth} from '../../constants/constants';

const CourseItem = () => {
  return (
    <View style={styles.root}>
      <Text>CourseItem</Text>
    </View>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  root: {
    height: (deviceWidth - 16) / 3,
    width: (deviceWidth - 16) / 3,
    borderWidth: 1,
  },
});
