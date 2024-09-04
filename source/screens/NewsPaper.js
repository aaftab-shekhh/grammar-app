import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import CommonHead from '../components/styles/CommonHead';
import {images} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/colors';
import Font700 from '../components/font/Font700';
import {get_data} from '../utils/api';
import NewsPaperItem from '../components/items/NewsPaperItem';
import BannerADs from '../components/styles/BannerADs';

const NewsPaper = ({route}) => {
  const route_data = route?.params?.data;
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);

  const {category_name, id} = route_data;

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

      setList(response?.data);
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
