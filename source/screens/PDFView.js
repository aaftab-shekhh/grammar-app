import React, {memo, useCallback, useEffect, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {deviceHeight, deviceWidth} from '../constants/constants';
import {images} from '../assets';
import CommonHead from '../components/styles/CommonHead';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import EmptyList from '../components/list/EmptyList';

const adUnitId = 'ca-app-pub-6464114688925756/5287737073';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const PDFView = ({route}) => {
  const route_data = route?.params?.data;
  const {title, pdf} = route_data;
  const [loaded, setLoaded] = useState(false);

  const focus = useIsFocused();

  const {goBack} = useNavigation();

  useEffect(() => {
    try {
      console.log('"LOADING"', 'LOADING');
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          console.log('"LOAD"', 'LOAD');
          setLoaded(true);
        },
      );

      // Start loading the interstitial straight away
      interstitial.load();

      // Unsubscribe from events on unmount
      return unsubscribe;
    } catch (err) {
      console.log('err', err);
    }
  }, []);

  useEffect(() => {
    if (!focus) return;

    const backAction = () => {
      try {
        if (!loaded) {
          return null;
        }
        interstitial?.show();
      } catch (err) {
        console.log('err', err);
      }
      goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [focus, loaded]);

  const onGoBack = useCallback(() => {
    try {
      if (!loaded) {
        return null;
      }
      interstitial?.show();
      goBack();
    } catch (err) {
      console.log('err', err);
    }
  }, [loaded]);

  return (
    <View style={{flex: 1}}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={onGoBack}
        title={title}
      />
      <View style={styles.container}>
        {!loaded ? (
          <EmptyList loader={!loaded} message={'No Data Available'} />
        ) : (
          <Pdf
            trustAllCerts={false}
            source={{
              uri: pdf,
              cache: false,
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        )}
      </View>
    </View>
  );
};

export default memo(PDFView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});
