import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {deviceHeight, deviceWidth} from '../constants/constants';
import {images} from '../assets';
import CommonHead from '../components/styles/CommonHead';
import {useNavigation} from '@react-navigation/native';

const PDFView = ({route}) => {
  const route_data = route?.params?.data;
  const {title, pdf} = route_data;

  const {goBack} = useNavigation();

  return (
    <View style={{flex: 1}}>
      <CommonHead
        leftIcon={images.arrow_left}
        onPressLeft={goBack}
        title={title}
      />
      <View style={styles.container}>
        <Pdf
          trustAllCerts={false}
          source={{
            uri: pdf,
            cache: false,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </View>
  );
};

export default memo(PDFView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});
