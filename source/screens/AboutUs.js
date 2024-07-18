import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {images} from '../assets';
import CommonHead from '../components/styles/CommonHead';
import {deviceWidth} from '../constants/constants';
import {get_data} from '../utils/api';

const AboutUs = () => {
  const [aboutUs, setAboutUs] = useState('');
  const [loader, setLoader] = useState(false);

  const {goBack} = useNavigation();

  const getData = useCallback(async () => {
    try {
      setLoader(true);

      const data = {
        access_key: 6808,
        get_about_us: 1,
      };

      const response = await get_data(data);
      setAboutUs(response?.data);
    } catch (err) {
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  // console.log('aboutUs', aboutUs);

  const source = {
    html: `${aboutUs}`,
  };

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        title={'About US'}
        onPressLeft={goBack}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
        <RenderHtml contentWidth={deviceWidth} source={source} />
      </ScrollView>
    </View>
  );
};

export default memo(AboutUs);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
  },
});
