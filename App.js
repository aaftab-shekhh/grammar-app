import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Root from './source/stacks/Root';
import {colors} from './source/constants/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent={true}
        barStyle={'light-content'}
        backgroundColor={colors.transparent}
      />
      <Root />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
