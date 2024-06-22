import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Root from './source/stacks/Root';
import {colors} from './source/constants/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store, {persistor} from './source/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            translucent={true}
            barStyle={'light-content'}
            backgroundColor={colors.transparent}
          />
          <Root />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
