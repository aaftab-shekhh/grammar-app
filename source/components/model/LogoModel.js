import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';
import {colors} from '../../constants/colors';
import {deviceHeight, deviceWidth} from '../../constants/constants';
import Font500 from '../font/Font500';

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
      <View style={styles.model}>
        <View style={styles.content}>
          <Pressable onPress={close} style={styles.closeContainer}>
            <FastImage
              style={styles.icon}
              resizeMode="contain"
              source={images.close}
            />
          </Pressable>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingTop: 40}}>
            <View style={styles.textContainer}>
              <Font500
                style={
                  styles.text
                }>{`As this app is fully educational purpose, therefore, considering the students' aspects, we have used lots of photos in this app (all photos used in this app, are copyrighted by englivia). And, for that purpose, we want to state you that before using this app make sure that whether you have good internet connection, if you don't have good internet connection then this app might work slow in your phone.  That's why we need your patience.  This app is completely FREE. You can access this app in three language viz. Hindi, Bengali and English.  If you are Hindi spoken person then you are requested to choose English + Hindi Mode.  If you are Bengali spoken person then you are requested to choose English + Bengali Mode. And, If you are only english spoken person then you are requested to choose English  Mode Study.`}</Font500>
              <Font500 style={styles.text}></Font500>
            </View>
            <View
              style={{
                marginVertical: 20,
                height: 1,
                backgroundColor: '#00067a',
              }}
            />
            <View style={styles.textContainer}>
              <Font500 style={styles.text}>
                {`चूंकि यह ऐप पूरी तरह से शैक्षिक उद्देश्य है, इसलिए हमने छात्रों को ध्यान में रखते हुए इस ऐप में बहुत सारी तस्वीरों का उपयोग किया है (इस ऐप में उपयोग की गई सभी तस्वीरें Englivia द्वारा कॉपीराइट हैं)। और, इस उद्देश्य के लिए, हम आपको बताना चाहते हैं कि इस ऐप का उपयोग करने से पहले सुनिश्चित करें कि आपके पास अच्छा इंटरनेट कनेक्शन है, यदि आपके पास अच्छा इंटरनेट कनेक्शन नहीं है तो यह ऐप आपके फ़ोन पर धीमा काम कर सकता है। इसलिए हमें आपके धैर्य की आवश्यकता है. यह ऐप पूरी तरह से मुफ़्त है. आप इस ऐप को तीन भाषाओं में एक्सेस कर सकते हैं। हिंदी, बंगाली और अंग्रेजी। यदि आप हिंदी भाषी हैं तो आपसे अंग्रेजी + हिंदी मोड चुनने का अनुरोध किया जाता है। यदि आप बंगाली भाषी व्यक्ति हैं तो आपसे अंग्रेजी + बंगाली मोड चुनने का अनुरोध किया जाता है। और, यदि आप केवल अंग्रेजी बोलने वाले व्यक्ति हैं, तो आपसे अनुरोध है कि अध्ययन का अंग्रेजी तरीका चुनें।`}
              </Font500>
            </View>
            <View
              style={{
                marginVertical: 20,
                height: 1,
                backgroundColor: '#00067a',
              }}
            />
            <View style={[styles.textContainer, {paddingBottom: 20}]}>
              <Font500 style={styles.text}>
                {`যেহেতু এই অ্যাপটি সম্পূর্ণ শিক্ষামূলক উদ্দেশ্য, তাই, শিক্ষার্থীদের দিক বিবেচনা করে, আমরা এই অ্যাপটিতে প্রচুর ফটো ব্যবহার করেছি (এই অ্যাপটিতে ব্যবহৃত সমস্ত ফটো Englivia  দ্বারা কপিরাইটযুক্ত)। এবং, সেই উদ্দেশ্যে, আমরা আপনাকে বলতে চাই যে এই অ্যাপটি ব্যবহার করার আগে আপনার ভাল ইন্টারনেট সংযোগ আছে কিনা তা নিশ্চিত করুন, যদি আপনার ভাল ইন্টারনেট সংযোগ না থাকে তবে এই অ্যাপটি আপনার ফোনে ধীর গতিতে কাজ করতে পারে। এজন্য আপনার ধৈর্য আমাদের দরকার। এই অ্যাপটি সম্পূর্ণ বিনামূল্যে। আপনি তিনটি ভাষায় যেমন এই অ্যাপটি অ্যাক্সেস করতে পারেন। হিন্দি, বাংলা ও ইংরেজি। আপনি যদি হিন্দি কথ্য ব্যক্তি হন তবে আপনাকে ইংরেজি + হিন্দি মোড বেছে নিতে অনুরোধ করা হচ্ছে। আপনি যদি বাংলা কথ্য ব্যক্তি হন তবে আপনাকে ইংরেজি + বাংলা মোড বেছে নিতে অনুরোধ করা হচ্ছে। এবং, আপনি যদি শুধুমাত্র ইংরেজি কথ্য ব্যক্তি হন তবে আপনাকে ইংরেজি মোড স্টাডি বেছে নিতে অনুরোধ করা হচ্ছে।`}
              </Font500>
            </View>
            {/* <FastImage
            source={images.logo}
            style={styles.images}
            resizeMode="contain"
            /> */}
          </ScrollView>
        </View>
      </View>
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
    width: deviceWidth * 0.8,
    height: deviceHeight * 0.8,
    // padding: deviceWidth * 0.05,
    backgroundColor: colors.colorebf2fa,
  },
  textContainer: {
    paddingHorizontal: 28,
  },
  text: {
    color: '#00067a',
    fontSize: 14,
  },
  closeContainer: {
    padding: 10,
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  icon: {
    height: 14,
    width: 14,
  },
  images: {
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.7,
  },
});
