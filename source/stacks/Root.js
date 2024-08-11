import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../constants/colors';
import {screens} from '../constants/screens';
import {update_user} from '../redux/store';
import Home from '../screens/Home';
import LearnWithImages from '../screens/LearnWithImages';
import LearnWithQuiz from '../screens/LearnWithQuiz';
import NewsPaper from '../screens/NewsPaper';
import SelectLevel from '../screens/SelectLevel';
import SelectSet from '../screens/SelectSet';
import Setting from '../screens/Setting';
import {error} from '../tost/error';
import {get_token} from '../utils/api';
import AboutUs from '../screens/AboutUs';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsConditions from '../screens/TermsConditions';
import Instruction from '../screens/Instruction';
import SelectMock from '../screens/SelectMock';
import MockTest from '../screens/MockTest';
import CurrentAffairs from '../screens/CurrentAffairs';

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
        <Stack.Screen name={screens.MockTest} component={MockTest} />
        <Stack.Screen
          name={screens.LearnWithImages}
          component={LearnWithImages}
        />
        <Stack.Screen name={screens.LearnWithQuiz} component={LearnWithQuiz} />
        <Stack.Screen name={screens.AboutUs} component={AboutUs} />
        <Stack.Screen name={screens.PrivacyPolicy} component={PrivacyPolicy} />
        <Stack.Screen name={screens.Instruction} component={Instruction} />
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
    </NavigationContainer>
  );
};

export default memo(Root);

const styles = StyleSheet.create({});
