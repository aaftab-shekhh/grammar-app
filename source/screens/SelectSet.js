import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import Font700 from '../components/font/Font700';
import SelectItem from '../components/items/SelectItem';
import CommonHead from '../components/styles/CommonHead';
import {colors} from '../constants/colors';
import {get_data} from '../utils/api';

const SelectSet = ({route}) => {
  const {screens_form, category} = route?.params;

  const {goBack, navigate} = useNavigation();

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = useCallback(async () => {
    const data = {
      access_key: 6808,
      get_learning: 1,
      category: category,
    };

    try {
      setLoader(true);
      const response = await get_data(data);
      setData(response?.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }, [category]);

  useEffect(() => {
    if (category) getData();
  }, [category]);

  const renderItemHandler = useCallback(({item}) => {
    const {no_of, title} = item;

    const onNavigateScreen = () => {
      navigate(screens_form, {data: item});
    };

    return (
      <SelectItem
        onPress={onNavigateScreen}
        title={title}
        subTitle={`${no_of} Questions`}
      />
    );
  }, []);

  return (
    <View style={styles.root}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={'Idioms And Phrases'}
      />

      <FlatList
        data={data}
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
          backgroundColor: colors.colorFF0E0E,
        }}>
        <Font700 style={{color: colors.white, textAlign: 'center'}}>
          {'ADD'}
        </Font700>
      </View>
    </View>
  );
};

export default memo(SelectSet);

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
