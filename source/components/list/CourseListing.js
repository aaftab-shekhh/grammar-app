import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import CourseItem from '../items/CourseItem';
import {colors} from '../../constants/colors';

const array = [
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
  {title: 'Idioms & phrases'},
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
    elevation: 1,
    marginTop: 11,
    shadowRadius: 4,
    marginBottom: 67,
    shadowOpacity: 0.1,
    marginHorizontal: 8,
    shadowColor: colors.black,
    shadowOffset: {height: 2, width: 0},
  },
});
