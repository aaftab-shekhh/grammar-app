import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Font500 from '../font/Font500';
import Font600 from '../font/Font600';
import {colors} from '../../constants/colors';

const NewsPaperItem = ({data}) => {
  const {number, word, meaning} = data;
  return (
    <View style={styles.root}>
      <View>
        <Font500 style={styles.number}>{number + 1}</Font500>
      </View>
      <View style={styles.wordContainer}>
        <Font600 style={styles.word}>{word}</Font600>
      </View>
      <View style={styles.wordContainer}>
        <Font600 style={styles.meaning}>{meaning}</Font600>
      </View>
    </View>
  );
};

export default NewsPaperItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {height: 2, width: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  number: {
    paddingHorizontal: 10,
  },
  wordContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  word: {
    color: colors.color125A92,
  },
});
