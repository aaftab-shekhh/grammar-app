import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import CourseItem from '../items/CourseItem';

const array = [
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
  {title: 'Idioms &   phrases'},
];

const CourseListing = () => {
  return (
    <FlatList
      data={array}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={styles.root}
      renderItem={({item}) => <CourseItem data={item} />}
      keyExtractor={(_, index) => index?.toString()}
    />
  );
};

export default memo(CourseListing);

const styles = StyleSheet.create({
  root: {
    marginTop: 11,
    marginHorizontal: 8,
    marginBottom: 67,
  },
});
