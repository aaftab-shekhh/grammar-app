import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CourseListing from '../components/list/CourseListing';
import ImageSlider from '../components/list/ImageSlider';
import CommonHead from '../components/styles/CommonHead';

const Home = () => {
  return (
    <View style={styles.root}>
      <CommonHead />
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}>
        <ImageSlider />
        <CourseListing />
      </ScrollView>
    </View>
  );
};

export default memo(Home);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {flexGrow: 1},
});
