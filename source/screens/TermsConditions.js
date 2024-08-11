import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import Font400 from '../components/font/Font400';
import CommonHead from '../components/styles/CommonHead';
import {get_data} from '../utils/api';

const TermsConditions = () => {
  const [termsConditions, setTermsConditions] = useState('');
  const [loader, setLoader] = useState(false);

  const {goBack} = useNavigation();

  const getData = useCallback(async () => {
    try {
      setLoader(true);

      const data = {
        access_key: 6808,
        get_terms_conditions_settings: 1,
      };

      const response = await get_data(data);
      setTermsConditions(response?.data);
    } catch (err) {
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const stripHtml = html => {
    const regex = /(<([^>]+)>)/gi;
    let text = html.replace(/<br\s*\/?>/gi, '\n'); // Replace <br> tags with new lines
    text = text.replace(/<\/p>/gi, '\n\n'); // Replace </p> tags with double new lines for paragraph breaks
    text = text.replace(regex, ''); // Strip remaining HTML tags
    return text;
  };

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        title={'Terms Conditions'}
        onPressLeft={goBack}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 50}}>
        <Font400>{stripHtml(termsConditions)}</Font400>
      </ScrollView>
    </View>
  );
};

export default memo(TermsConditions);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
  },
});
