import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import CommonHead from '../components/styles/CommonHead';
import {images} from '../assets';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/colors';
import Font700 from '../components/font/Font700';

const SelectSet = ({route}) => {
  const screens_form = route?.params?.screens_form;

  const {goBack, navigate} = useNavigation();

  const renderItemHandler = useCallback(({index}) => {
    const onNavigateScreen = () => {
      navigate(screens_form, {set_no: `Set ${index + 1}`});
    };

    return (
      <Pressable
        onPress={onNavigateScreen}
        style={{
          height: 72,
          paddingLeft: 8,
          borderRadius: 7,
          shadowRadius: 1,
          borderWidth: 0.5,
          shadowOpacity: 0.1,
          marginHorizontal: 8,
          justifyContent: 'center',
          shadowColor: colors.black,
          backgroundColor: colors.white,
          shadowOffset: {height: 2, width: 2},
          borderColor: colors.transparent_black_10,
        }}>
        <Font700
          style={{
            fontSize: 16,
            colors: colors.black,
          }}>
          {`Set ${index + 1}`}
        </Font700>
        <Font700
          style={{
            fontSize: 12,
            colors: colors.black,
          }}>
          {'10 Questions'}
        </Font700>
      </Pressable>
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
  },
});
