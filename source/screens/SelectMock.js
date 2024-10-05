import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {images} from '../assets';
import Font700 from '../components/font/Font700';
import SelectItem from '../components/items/SelectItem';
import CommonHead from '../components/styles/CommonHead';
import {colors} from '../constants/colors';
import {get_mock} from '../utils/api';
import {screens} from '../constants/screens';
import BannerADs from '../components/styles/BannerADs';
import EmptyList from '../components/list/EmptyList';

const SelectMock = ({route}) => {
  const route_data = route?.params;
  const {id, category_name, screens_form, type} = route_data;

  const user = useSelector(state => state?.auth);

  const {goBack, navigate} = useNavigation();

  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoader(true);
      const response = await get_mock();

      setList(response?.data ? response?.data : []);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }, [id, type, user]);

  useEffect(() => {
    getData();
  }, [id]);

  const renderItemHandler = useCallback(
    ({item}) => {
      const {questions, category_name} = item;

      const onNavigateScreen = () => {
        navigate(screens.Instruction, {
          data: {...item, category_name: category_name, type: type},
        });
      };

      return (
        <SelectItem
          data={item}
          title={category_name}
          onPress={onNavigateScreen}
          subTitle={questions ? `${questions} Questions` : null}
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
        ListEmptyComponent={
          <EmptyList loader={loader} message={'Data not available'} />
        }
      />
    </View>
  );
};

export default memo(SelectMock);

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
