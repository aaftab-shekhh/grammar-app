import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../constants/colors';
import {screens} from '../constants/screens';
import {update_user} from '../redux/store';
import AboutUs from '../screens/AboutUs';
import CurrentAffairs from '../screens/CurrentAffairs';
import Home from '../screens/Home';
import Instruction from '../screens/Instruction';
import LearnWithImages from '../screens/LearnWithImages';
import LearnWithQuiz from '../screens/LearnWithQuiz';
import MCQListing from '../screens/MCQListing';
import MockTest from '../screens/MockTest';
import MonthListing from '../screens/MonthListing';
import NewsPaper from '../screens/NewsPaper';
import PDFView from '../screens/PDFView';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import SelectLevel from '../screens/SelectLevel';
import SelectMock from '../screens/SelectMock';
import SelectSet from '../screens/SelectSet';
import Setting from '../screens/Setting';
import TermsConditions from '../screens/TermsConditions';
import {error} from '../tost/error';
import {get_token} from '../utils/api';
import MSQQuestion from '../screens/MSQQuestion';
import Score from '../screens/Score';
import BannerADs from '../components/styles/BannerADs';

const Stack = createNativeStackNavigator();

const Root = () => {
  const {bottom} = useSafeAreaInsets();
  const [loader, setLoader] = useState(false);

  const user = useSelector(state => state?.auth);

  const dispatch = useDispatch();

  const getToken = useCallback(async () => {
    try {
      setLoader(true);
      const response = await get_token();
      dispatch(update_user({access_token: response}));
    } catch (e) {
      error(e);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.white,
          },
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name={screens.Home} component={Home} />
        <Stack.Screen name={screens.SelectLevel} component={SelectLevel} />
        <Stack.Screen name={screens.SelectSet} component={SelectSet} />
        <Stack.Screen name={screens.SelectMock} component={SelectMock} />
        <Stack.Screen
          name={screens.MockTest}
          component={MockTest}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={screens.LearnWithImages}
          component={LearnWithImages}
        />
        <Stack.Screen name={screens.LearnWithQuiz} component={LearnWithQuiz} />
        <Stack.Screen name={screens.AboutUs} component={AboutUs} />
        <Stack.Screen name={screens.PrivacyPolicy} component={PrivacyPolicy} />
        <Stack.Screen name={screens.Instruction} component={Instruction} />
        <Stack.Screen name={screens.PDFView} component={PDFView} />
        <Stack.Screen name={screens.MCQListing} component={MCQListing} />
        <Stack.Screen name={screens.MonthListing} component={MonthListing} />
        <Stack.Screen name={screens.MSQQuestion} component={MSQQuestion} />
        <Stack.Screen
          name={screens.Score}
          component={Score}
          options={{
            gestureEnabled: false,
            animation: 'slide_from_left',
          }}
        />
        <Stack.Screen
          name={screens.TermsConditions}
          component={TermsConditions}
        />
        <Stack.Screen name={screens.NewsPaper} component={NewsPaper} />
        <Stack.Screen
          name={screens.CurrentAffairs}
          component={CurrentAffairs}
        />
        <Stack.Screen
          name={screens.Settings}
          component={Setting}
          options={{animation: 'slide_from_left'}}
        />
      </Stack.Navigator>
      <View style={{height: bottom, backgroundColor: colors.black}} />
      <View
        style={{
          height: 52,
          justifyContent: 'center',
          backgroundColor: colors.white,
        }}>
        <BannerADs />
      </View>
    </NavigationContainer>
  );
};

export default memo(Root);

const styles = StyleSheet.create({});
