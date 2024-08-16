import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {images} from '../assets';
import SelectItem from '../components/items/SelectItem';
import CommonHead from '../components/styles/CommonHead';
import {screens} from '../constants/screens';

const CurrentAffairs = ({route}) => {
  const {goBack} = useNavigation();

  const route_data = route?.params;

  const {navigate} = useNavigation();

  const onNavigatePDFs = useCallback(() => {
    navigate(screens.MonthListing, {
      ...route_data,
      screens_form: screens.PDFView,
    });
  }, [route_data]);

  const onNavigateMCQs = useCallback(() => {
    navigate(screens.MonthListing, {
      ...route_data,
      screens_form: screens.MCQListing,
    });
  }, [route_data]);

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={'Current Affairs'}
      />
      <View style={styles.content}>
        <SelectItem
          style={styles.item}
          onPress={onNavigatePDFs}
          title={'PDFs'}
        />
        <SelectItem
          style={styles.item}
          onPress={onNavigateMCQs}
          title={'MCQs'}
        />
      </View>
    </View>
  );
};

export default memo(CurrentAffairs);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    marginTop: 32,
    marginHorizontal: 8,
  },
  item: {
    marginBottom: 8,
  },
});
