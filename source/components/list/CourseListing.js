import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../constants/colors';
import {get_data} from '../../utils/api';
import CourseItem from '../items/CourseItem';

const CourseListing = () => {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);

  const user = useSelector(state => state?.auth);

  const getData = useCallback(async () => {
    const data = {
      type: 2,
      access_key: 6808,
      get_categories_by_language: 1,
      language_id: user?.user?.language,
    };
    const data_2 = {
      access_key: 6808,
      get_categories_by_language: 1,
      language_id: user?.user?.language,
    };

    try {
      setLoader(true);
      const response = await get_data(data);
      const response_2 = await get_data(data_2);
      setList([
        ...response?.data,
        ...response_2?.data?.reverse(),
        {category_name: 'Newspaper Words', type: 3},
      ]);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.user?.language) getData();
  }, [user]);

  return (
    <FlatList
      data={list}
      numColumns={3}
      scrollEnabled={false}
      contentContainerStyle={styles.root}
      renderItem={({item}) => <CourseItem data={item} />}
      keyExtractor={(_, index) => index?.toString()}
    />
  );
};

export default memo(CourseListing);

const styles = StyleSheet.create({
  root: {
    elevation: 4,
    marginTop: 11,
    shadowRadius: 4,
    marginBottom: 67,
    shadowOpacity: 0.1,
    marginHorizontal: 8,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {height: 2, width: 0},
  },
});
