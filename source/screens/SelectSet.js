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

const SelectSet = ({route}) => {
  const route_data = route?.params;
  const {id, category_name, screens_form, type} = route_data;

  const user = useSelector(state => state?.auth);

  const {goBack, navigate} = useNavigation();

  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);

  function sortByTitle(arr) {
    return arr.sort((a, b) => {
      const numA = parseInt(a.title.split(' ')[1]);
      const numB = parseInt(b.title.split(' ')[1]);

      return numA - numB;
    });
  }

  function sortBySubcategoryName(arr) {
    return arr.sort((a, b) => {
      const numA = parseInt(a.subcategory_name.split(' ')[1]);
      const numB = parseInt(b.subcategory_name.split(' ')[1]);

      return numA - numB;
    });
  }

  const getData = useCallback(async () => {
    console.log('user?.user?.language', user?.user?.language);

    let data = {
      access_key: 6808,
      get_learning: 1,
      category: id,
    };

    if (type === '1') {
      data = {
        access_key: 6808,
        get_subcategory_by_maincategory: 1,
        main_id: id,
      };
    }

    if (type === '3') {
      data = {
        access_key: 6808,
        get_sets_by_language: 1,
        language_id: user?.user?.language,
      };
    }

    try {
      setLoader(true);
      console.log('data', data);
      const response = await get_data(data);

      if (type === '1') {
        setList(sortBySubcategoryName(response?.data));
      } else {
        setList(sortByTitle(response?.data));
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }, [id, type, user]);

  console.log('loader', loader);

  useEffect(() => {
    getData();
  }, [id]);

  const renderItemHandler = useCallback(
    ({item}) => {
      const {no_of, title} = item;

      const onNavigateScreen = () => {
        if (type === '3') {
          navigate(screens.NewsPaper, {
            data: {...item, category_name: category_name, type: type},
          });
        } else {
          navigate(screens_form, {
            data: {...item, category_name: category_name, type: type},
          });
        }
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
