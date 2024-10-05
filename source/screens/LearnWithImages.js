import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {BackHandler, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {images} from '../assets';
import Font400 from '../components/font/Font400';
import Font600 from '../components/font/Font600';
import Font700 from '../components/font/Font700';
import Font800 from '../components/font/Font800';
import Button from '../components/styles/Button';
import CommonHead from '../components/styles/CommonHead';
import {colors} from '../constants/colors';
import {deviceWidth} from '../constants/constants';
import {get_data} from '../utils/api';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import EmptyList from '../components/list/EmptyList';

const adUnitId = 'ca-app-pub-6464114688925756/5287737073';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const LearnWithImages = ({route}) => {
  const route_data = route?.params;
  const {title, category_name, id} = route_data?.data;

  const [currentIndex, setCurrentIndex] = useState(0);

  const user = useSelector(state => state?.auth);

  const {goBack} = useNavigation();

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const focus = useIsFocused();

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
      setData();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [focus, loaded]);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  const getData = useCallback(async () => {
    const data = {
      access_key: 6808,
      get_details_by_learning: 1,
      learning_id: id,
    };

    try {
      setLoader(true);
      const response = await get_data(data);
      setData(response?.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  }, [id, user]);

  useEffect(() => {
    if (id) getData();
  }, [id]);

  const onNextHandler = useCallback(() => {
    if (currentIndex + 1 === data.length) {
    } else {
      setCurrentIndex(prev => (prev + 1 < data.length ? prev + 1 : prev));
    }
  }, [currentIndex, data]);

  const onFinishHandler = useCallback(() => {
    try {
      if (!loaded) {
        return null;
      }
      interstitial?.show();
      goBack();
      setData();
    } catch (err) {
      console.log('err', err);
    }
  }, [loaded]);

  const onPrevHandler = useCallback(
    () => setCurrentIndex(prev => (prev >= 0 ? prev - 1 : prev)),
    [],
  );

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={onFinishHandler}
        title={category_name}
        extraHeight={33}>
        <Font600 style={styles.heading}>{title}</Font600>
      </CommonHead>

      {loader || !loaded ? (
        <EmptyList loader={loader || !loaded} message={'No Data Available'} />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
              <Font700 style={styles.title}>
                {data[currentIndex]?.headline}
              </Font700>
            </View>
            <View style={styles.meaningContainer}>
              <Font800 style={styles.meaningTitle}>{'Meaning : '}</Font800>
              <Font400 style={styles.meaningContent}>
                {data[currentIndex]?.headline_meaning}
              </Font400>
            </View>
            <View style={styles.meaningContainer}>
              <Font800 style={styles.meaningTitle}>{'Sentence : '}</Font800>
              <Font400
                style={[
                  styles.meaningContent,
                  {
                    color: colors.color4682B4,
                  },
                ]}>
                {data[currentIndex]?.detail}
              </Font400>
            </View>
            <FastImage
              source={{
                uri: `https://cl.englivia.com/images/category/${data[currentIndex]?.image}`,
              }}
              resizeMode={'contain'}
              style={styles.image}
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            {currentIndex !== 0 ? (
              <Button
                onPress={onPrevHandler}
                iconStyle={styles.buttonIcon}
                icon={images.arrow_left}>
                {'Prev'}
              </Button>
            ) : (
              <View />
            )}
            {currentIndex + 1 === data.length ? (
              <Button
                onPress={onFinishHandler}
                iconStyle={styles.buttonIcon}
                buttonStyle={styles.next}
                icon={images.arrow_right}>
                {'Finish'}
              </Button>
            ) : (
              <Button
                onPress={onNextHandler}
                iconStyle={styles.buttonIcon}
                buttonStyle={styles.next}
                icon={images.arrow_right}>
                {'Next'}
              </Button>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default memo(LearnWithImages);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  heading: {
    top: 22,
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    paddingBottom: 48,
  },
  titleContainer: {
    height: 45,
    elevation: 4,
    marginTop: 24,
    shadowRadius: 4,
    borderRadius: 12,
    marginBottom: 16,
    shadowOpacity: 0.1,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {height: 1, width: 0},
    backgroundColor: colors.color89C6F0,
  },
  title: {
    fontSize: 18,
  },
  meaningContainer: {
    elevation: 4,
    shadowRadius: 4,
    marginBottom: 16,
    borderRadius: 12,
    shadowOpacity: 0.2,
    paddingVertical: 24,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {height: 2, width: 1},
  },
  meaningTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  meaningContent: {
    fontSize: 16,
  },
  image: {
    height: 390,
    marginTop: 32,
    borderRadius: 16,
    alignSelf: 'center',
    width: deviceWidth - 16,
  },
  buttonIcon: {
    height: 24,
    width: 24,
  },
  buttonContainer: {
    bottom: 52,
    width: '100%',
    marginBottom: 1,
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  next: {
    flexDirection: 'row-reverse',
  },
});
