// src/ProgressBar.js
import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import Font600 from '../font/Font600';

const ProgressBar = ({
  progress,
  height,
  backgroundColor,
  barColor,
  totalQuestion,
  completedQuestion,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolation = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, {height, backgroundColor}]}>
      <Animated.View
        style={[
          styles.bar,
          {width: widthInterpolation, backgroundColor: barColor},
        ]}
      />
      <Font600
        style={
          styles.title
        }>{`Question ${completedQuestion} of ${totalQuestion}`}</Font600>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bar: {
    height: '100%',
    borderRadius: 5,
  },
  title: {
    position: 'absolute',
    left: 20,
  },
});

export default ProgressBar;
