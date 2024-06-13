import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import CommonHead from '../components/styles/CommonHead';
import {images} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/colors';
import Font700 from '../components/font/Font700';
import SelectItem from '../components/items/SelectItem';

const SelectSet = ({route}) => {
  const screens_form = route?.params?.screens_form;

  const {goBack, navigate} = useNavigation();

  const renderItemHandler = useCallback(({index}) => {
    const onNavigateScreen = () => {
      navigate(screens_form, {set_no: `Set ${index + 1}`});
    };

    return (
      <SelectItem
        onPress={onNavigateScreen}
        title={`Set ${index + 1}`}
        subTitle={'10 Questions'}
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
        data={Array(10).fill(0)}
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
