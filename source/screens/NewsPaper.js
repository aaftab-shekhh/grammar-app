import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {BackHandler, FlatList, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import NewsPaperItem from '../components/items/NewsPaperItem';
import EmptyList from '../components/list/EmptyList';
import CommonHead from '../components/styles/CommonHead';
import {get_data} from '../utils/api';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-6464114688925756/5287737073';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const NewsPaper = ({route}) => {
  const route_data = route?.params?.data;
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const {category_name, id} = route_data;

  const focus = useIsFocused();

  const {goBack} = useNavigation();

  const getList = useCallback(async () => {
    try {
      setLoader(true);

      const data = {
        access_key: 6808,
        get_data_by_sets: 1,
        dictionary_id: id,
      };

      const response = await get_data(data);

      setList(response?.data ? response?.data : []);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const renderItemHandler = useCallback(({item, index}) => {
    return <NewsPaperItem data={{...item, number: index}} />;
  }, []);

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
      setList([]);
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
      setList([]);
    } catch (err) {
      console.log('err', err);
    }
  }, [loaded]);

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={onGoBack}
        title={category_name}
      />
      <FlatList
        data={list}
        renderItem={renderItemHandler}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index?.toString()}
        ItemSeparatorComponent={<View style={{height: 12}} />}
        ListEmptyComponent={
          <EmptyList loader={loader} message={'Data not available'} />
        }
      />
    </View>
  );
};

export default memo(NewsPaper);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    paddingVertical: 32,
    marginHorizontal: 8,
  },
});
