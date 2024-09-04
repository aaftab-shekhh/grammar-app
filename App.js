import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Root from './source/stacks/Root';
import {colors} from './source/constants/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store, {persistor} from './source/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-6464114688925756~4549370474';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const App = () => {
  const [addLoad, setAddLoaded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!addLoad) {
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          setAddLoaded(true);
        },
      );
      interstitial.load();
      return unsubscribe;
    }
  }, [addLoad]);

  useEffect(() => {
    if (addLoad && !loaded) {
      try {
        setLoaded(true);
        console.log('"first"', 'first');
        interstitial.show();
      } catch (err) {
        console.log('err', err);
      }
    }
  }, [loaded, addLoad]);

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
