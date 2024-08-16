import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {images} from '../assets';
import Font700 from '../components/font/Font700';
import SelectItem from '../components/items/SelectItem';
import CommonHead from '../components/styles/CommonHead';
import {colors} from '../constants/colors';
import {get_data} from '../utils/api';
import {useSelector} from 'react-redux';
import {screens} from '../constants/screens';

const MCQListing = ({route}) => {
  const route_data = route?.params?.data;
  const {title, category_name} = route_data;
  const [list, setList] = useState([
    {
      title: 'Test 1',
      no_of: 10,
    },
    {
      title: 'Test 2',
      no_of: 10,
    },
    {
      title: 'Test 3',
      no_of: 10,
    },
    {
      title: 'Test 4',
      no_of: 10,
    },
    {
      title: 'Test 5',
      no_of: 10,
    },
  ]);
  const {goBack, navigate} = useNavigation();

  const renderItemHandler = useCallback(
    ({item}) => {
      const {no_of, title} = item;

      const onNavigateScreen = () => {
        navigate(screens.MSQQuestion, {
          data: {...item, category_name: category_name},
        });
      };

      return (
        <SelectItem
          data={item}
          onPress={onNavigateScreen}
          title={title}
          subTitle={no_of ? `${no_of} Questions` : null}
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
