import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';
import {colors} from '../../constants/colors';
import {deviceHeight, deviceWidth} from '../../constants/constants';

const LogoModel = forwardRef(({onClose}, ref) => {
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 10);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setVisible(true),
        close: close,
      };
    },
    [],
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <Pressable onPress={close} style={styles.model}>
        <Pressable onPress={() => {}} style={styles.content}>
          <Pressable onPress={close} style={styles.closeContainer}>
            <FastImage
              style={styles.icon}
              resizeMode="contain"
              source={images.close}
            />
          </Pressable>
          <FastImage
            source={images.logo}
            style={styles.images}
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
});

export default memo(LogoModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent_black_40,
  },
  content: {
    backgroundColor: colors.color24a726,
    padding: deviceWidth * 0.1,
  },
  closeContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 20,
    zIndex: 1,
  },
  icon: {
    height: 20,
    width: 20,
  },
  images: {
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.7,
  },
});
