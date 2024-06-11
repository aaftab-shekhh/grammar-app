import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import CourseItem from '../items/CourseItem';

const array = Array(12).fill(0);

const CourseListing = () => {
  return (
    <FlatList
      data={array}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={styles.root}
      renderItem={() => <CourseItem />}
      keyExtractor={(_, index) => index?.toString()}
    />
  );
};

export default memo(CourseListing);

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    marginTop: 11,
    marginHorizontal: 8,
    marginBottom: 67,
  },
});
