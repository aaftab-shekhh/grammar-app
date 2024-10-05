import React, {memo} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {colors} from './source/constants/colors';
import store, {persistor} from './source/redux/store';
import Root from './source/stacks/Root';

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

export default memo(App);

const styles = StyleSheet.create({});
