import {useIsFocused} from '@react-navigation/native';
import React, {memo, useState} from 'react';
import {View} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-6464114688925756/4166227097';

// const adUnitId = TestIds.ADAPTIVE_BANNER;

function BannerAds() {
  const focus = useIsFocused();

  return focus ? (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        networkExtras: {
          collapsible: 'bottom',
        },
      }}
    />
  ) : (
    <View />
  );
}

export default memo(BannerAds);
