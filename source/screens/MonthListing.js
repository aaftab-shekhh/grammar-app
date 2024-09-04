import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import Font700 from '../components/font/Font700';
import SelectItem from '../components/items/SelectItem';
import CommonHead from '../components/styles/CommonHead';
import {colors} from '../constants/colors';
import {screens} from '../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {
  get_mcq,
  get_paragraph_translation,
  get_pdf,
  get_sentence_structure,
  get_translation_one_liner,
} from '../utils/api';
import {error} from '../tost/error';
import BannerADs from '../components/styles/BannerADs';

const MonthListing = ({route}) => {
  const [list, setList] = useState([]);
  const route_data = route?.params;

  const [loader, setLoader] = useState(false);

  const {id, category_name, screens_form, type} = route_data;

  const getList = useCallback(async () => {
    try {
      setLoader(true);
      if (screens_form === screens.PDFView && type === '5') {
        const response = await get_pdf();

        setList(
          response?.data?.map(ele => {
            return {...ele, title: ele?.category_name};
          }),
        );
      } else if (screens_form === screens.MCQListing && type === '5') {
        const response = await get_mcq();
        setList(
          response?.data?.map(ele => {
            return {...ele, title: ele?.category_name};
          }),
        );
      } else if (type === '6') {
        const response = await get_translation_one_liner();
        setList(
          response?.data?.map(ele => {
            return {...ele, title: ele?.category_name};
          }),
        );
      } else if (type === '7') {
        const response = await get_paragraph_translation();
        setList(
          response?.data?.map(ele => {
            return {...ele, title: ele?.category_name};
          }),
        );
      } else if (type === '8') {
        const response = await get_sentence_structure();
        setList(
          response?.data?.map(ele => {
            return {...ele, title: ele?.category_name};
          }),
        );
      }
    } catch (err) {
      error(err);
    } finally {
      setLoader(false);
    }
  }, [type]);

  useEffect(() => {
    getList();
  }, [screens_form, type]);

  const {goBack, navigate} = useNavigation();

  const renderItemHandler = useCallback(
    ({item}) => {
      const {no_of, title, pdf} = item;

      const onNavigateScreen = () => {
        navigate(screens_form, {
          data: {...item, category_name: category_name, type: type},
        });
      };

      return (
        <SelectItem
          data={item}
          title={title}
          onPress={onNavigateScreen}
          subTitle={no_of ? `${no_of} Questions` : null}
        />
      );
    },
    [category_name, type],
  );

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={category_name}
      />

      <FlatList
        data={list}
        renderItem={renderItemHandler}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index?.toString()}
        ItemSeparatorComponent={<View style={{height: 12}} />}
      />
      <View
        style={{
          height: 52,
          justifyContent: 'center',
          backgroundColor: colors.white,
        }}>
        <BannerADs />
      </View>
    </View>
  );
};

export default memo(MonthListing);

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
