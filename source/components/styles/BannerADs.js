import React, {memo} from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-6464114688925756~4549370474';

// const adUnitId = TestIds.ADAPTIVE_BANNER;

function BannerAds() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        networkExtras: {
          collapsible: 'bottom',
        },
      }}
    />
  );
}

export default memo(BannerAds);
