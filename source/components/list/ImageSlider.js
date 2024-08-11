import {useIsFocused} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';
import {colors} from '../../constants/colors';
import {deviceWidth} from '../../constants/constants';

const prmoation_iamge = [
  images.add,
  images.add,
  images.add,
  images.add,
  images.add,
];

const ImageSlider = () => {
  const [currentIndex, setCurrantIndex] = useState(0);

  const listRef = useRef();

  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      if (!prmoation_iamge || prmoation_iamge?.length === 0) return;
      setTimeout(() => {
        onContinua();
      }, 5300);
    }
  }, [prmoation_iamge?.length, currentIndex, focus]);

  const onContinua = useCallback(() => {
    if (currentIndex === prmoation_iamge?.length - 1) {
      setCurrantIndex(0);
    } else {
      setCurrantIndex(prev => {
        if (prev + 1 !== prmoation_iamge?.length) return prev + 1;
        else return prev;
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!prmoation_iamge || prmoation_iamge?.length === 0) return;
    if (currentIndex < prmoation_iamge?.length)
      listRef?.current?.scrollToIndex({animated: true, index: currentIndex});
  }, [currentIndex]);

  const handleClick = useCallback(() => {}, []);

  const renderItemHandler = useCallback(
    ({item}) => (
      <Pressable
        onPress={handleClick?.bind(null, item?.url)}
        style={styles.addsImageContainer}>
        <FastImage source={item} style={styles.addImage} resizeMode="contain" />
      </Pressable>
    ),
    [],
  );

  return (
    <View style={styles.root}>
      <FlatList
        ref={listRef}
        horizontal={true}
        decelerationRate={0}
        scrollEnabled={false}
        data={prmoation_iamge}
        scrollEventThrottle={16}
        renderItem={renderItemHandler}
        initialScrollIndex={currentIndex}
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}
        snapToInterval={deviceWidth}
        keyExtractor={(_, index) => index?.toString()}
      />
      <View style={styles.paginationContainer}>
        {prmoation_iamge?.map((ele, index) => {
          return (
            <View
              key={index?.toString()}
              style={[
                styles.pagination,
                currentIndex === index ? styles.activePagination : null,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default memo(ImageSlider);

const styles = StyleSheet.create({
  root: {
    height: 170,
    marginTop: 9,
    backgroundColor: colors.color125A92,
  },
  addImage: {
    height: 140,
    width: deviceWidth,
  },
  addsImageContainer: {
    height: 140,
    width: deviceWidth,
  },
  paginationContainer: {
    height: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 10,
  },
  pagination: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 5,
    borderColor: colors.white,
  },
  activePagination: {
    width: 24,
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
});
