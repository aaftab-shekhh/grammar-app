import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import SelectItem from '../components/items/SelectItem';
import BannerADs from '../components/styles/BannerADs';
import CommonHead from '../components/styles/CommonHead';
import {colors} from '../constants/colors';
import {screens} from '../constants/screens';
import {error} from '../tost/error';
import {get_mcq_test} from '../utils/api';
import EmptyList from '../components/list/EmptyList';

const MCQListing = ({route}) => {
  const route_data = route?.params?.data;
  const {category_name, id} = route_data;
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const {goBack, navigate} = useNavigation();

  const getList = useCallback(async () => {
    try {
      setLoader(true);
      const response = await get_mcq_test(id);
      console.log('id', id);
      setList(response?.data ? response?.data : []);
    } catch (err) {
      error(err);
    } finally {
      setLoader(false);
    }
  }, [id]);

  useEffect(() => {
    getList();
  }, [id]);

  const renderItemHandler = useCallback(
    ({item}) => {
      const {questions} = item;

      const onNavigateScreen = () => {
        navigate(screens.MSQQuestion, {
          data: {...item, category_name: category_name},
        });
      };

      return (
        <SelectItem
          data={item}
          onPress={onNavigateScreen}
          title={item?.category_name}
          subTitle={questions ? `${questions} Questions` : null}
        />
      );
    },
    [category_name],
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
        ListEmptyComponent={
          <EmptyList loader={loader} message={'Data not available'} />
        }
      />
    </View>
  );
};

export default memo(MCQListing);

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
