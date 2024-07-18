import {FlatList, Linking, Share, StyleSheet, Text, View} from 'react-native';
import React, {memo, useCallback, useRef} from 'react';
import CommonHead from '../components/styles/CommonHead';
import {images} from '../assets';
import Font700 from '../components/font/Font700';
import {colors} from '../constants/colors';
import SettingItem from '../components/items/SettingItem';
import {useNavigation} from '@react-navigation/native';
import RatingModel from '../components/model/RatingModel';
import {screens} from '../constants/screens';
import TostModel from '../components/model/TostModel';

const Setting = () => {
  const {goBack, navigate} = useNavigation();

  const ratingModelRef = useRef();
  const contactRef = useRef();

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
      onPress: () => {
        ratingModelRef?.current?.open();
      },
    },
    {
      title: 'Share App',
      icon: images.share,
      onPress: async () => {
        try {
          const result = await Share.share({
            title: 'App link',
            message: `Unlock the Power of language with "Grammar Pro: English Learning"
Are you ready to elevate your english language skills to new heights? Look no further! "Grammar Pro: English Learning" is your ultimate companion on the journey to mastering English grammar and expanding your vocabulary.  Dive into a world of idioms, phrasal verbs, one-word substitutions, prepositions, synonyms, antonyms, and much more all in one convenient app.

Key Features:

Idioms and Phrases: Explore the rich tapestry of English idio matic expressions and phrases, Discover the meaninings behind them and learn how to use them effectively in your daily conversations and writing.

Phrasal Verbs Decoded: Confused by Phrasal verbs? Our app breaks them down into easy-to-understand explanations, providing you with clear definitions and usage examples.

One-Word Substitutions:  Enhance your vocabulary with a curated collection of one-word substitutions.  Say more with fewer words and make your communcation more concise and impactful.

Prepositions Made Simple: Master the often-tricky world of prepositions.  Our app provides comprehensive explanations and exercises to help you use prepositions correctly in different contexts.

Synonyms and Antonyms:  Challenge yourself with fun and engaging word search puzzles.  Improve your word recognition and vocabluary while having a blast.

Progress Tracking: Monitoring your progress as you learn and practice, Set personal goals and track your achievements over time.


Regular Updates: We're committed to providing you with fresh content and features regularly.  Stay tuned for exciting updates to keep your learning journey features regularly.  Stay tuned for exciting updates to keep your learning journey dynamic.

Unlock the door to effective communication, better writing, and a deeper understanding of English with "Grammar Pro: English Learning".  Whether you're a student, professional, or language enthusiast, our app is your trusty companion for all things English grammar and vocabulary.

Download "Grammar Pro: English Learning" today and start your journey towards English language mastery! https://play.google.com/store/apps/details?id=com.englivia.quiz`,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      },
    },
    {
      title: 'About Us',
      icon: images.about_us,
      onPress: () => {
        navigate(screens.AboutUs);
      },
    },
    {
      title: 'Contact Us',
      icon: images.contact_us,
      onPress: () => {
        contactRef?.current?.open();
      },
    },
    {
      title: 'Terms of Service',
      icon: images.terms_of_service,
      onPress: () => {
        navigate(screens.TermsConditions);
      },
    },
    {
      title: 'Privacy Policy',
      icon: images.privacy_policy,
      onPress: () => {
        navigate(screens.PrivacyPolicy);
      },
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
      <RatingModel ref={ratingModelRef} />
      <TostModel
        onPress={async () =>
          Linking.openURL(
            'mailto:contactus.englivia@gmail.com?subject=SendMail&body=Description',
          )
        }
        ref={contactRef}
        title={'Contact Us'}
        message={
          "If you have any questions, feedback, or suggestions, we'd love to hear from you! Please click the button below to send us an email. Your input helps us continue to deliver the best possible experience."
        }
      />
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

export default memo(Setting);

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
