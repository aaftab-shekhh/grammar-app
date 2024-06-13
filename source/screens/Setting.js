import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import CommonHead from '../components/styles/CommonHead';
import {images} from '../assets';
import Font700 from '../components/font/Font700';
import {colors} from '../constants/colors';
import SettingItem from '../components/items/SettingItem';
import {useNavigation} from '@react-navigation/native';

const Setting = () => {
  const {goBack} = useNavigation();

  const setting_array = [
    {
      title: 'Notification',
      icon: images.notification,
      onPress: () => {},
    },
    {
      title: 'Instruction',
      icon: images.instructioi,
      onPress: () => {},
    },
    {
      title: 'Submit Your Rating',
      icon: images.submit_your_rating,
      onPress: () => {},
    },
    {
      title: 'Share App',
      icon: images.share,
      onPress: () => {},
    },
    {
      title: 'About Us',
      icon: images.about_us,
      onPress: () => {},
    },
    {
      title: 'Contact Us',
      icon: images.contact_us,
      onPress: () => {},
    },
    {
      title: 'Terms of Service',
      icon: images.terms_of_service,
      onPress: () => {},
    },
    {
      title: 'Privacy Policy',
      icon: images.privacy_policy,
      onPress: () => {},
    },
  ];

  const renderItemHandler = useCallback(({item, index}) => {
    const {title, onPress, icon} = item;

    return (
      <SettingItem
        title={title}
        onPress={onPress}
        icon={icon}
        key={index?.toString()}
      />
    );
  }, []);

  return (
    <View style={styles.root}>
      <CommonHead
        rightIcon={images.arrow_right}
        title={'Englivia'}
        extraHeight={53}
        onPressRight={goBack}>
        <Font700 style={styles.title}>{'Settings'}</Font700>
      </CommonHead>
      <FlatList
        contentContainerStyle={styles.container}
        data={setting_array}
        renderItem={renderItemHandler}
        scrollEnabled={false}
        ItemSeparatorComponent={
          <View
            style={{
              height: 1,
              backgroundColor: colors.color616161,
              marginHorizontal: 4,
            }}
          />
        }
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingTop: 50,
    color: colors.white,
  },
  container: {
    marginTop: 12,
    borderWidth: 1,
    marginHorizontal: 8,
    borderColor: colors.color616161,
  },
});
