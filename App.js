import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Root from './source/stacks/Root';
import {colors} from './source/constants/colors';

const App = () => {
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={colors.transparent}
      />
      <Root />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
