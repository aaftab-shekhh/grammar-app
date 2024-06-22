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
import SelectLevel from '../screens/SelectLevel';
import SelectSet from '../screens/SelectSet';
import Setting from '../screens/Setting';
import {error} from '../tost/error';
import {get_token} from '../utils/api';

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
      console.log('response', response);
      dispatch(update_user({access_token: response}));
    } catch (e) {
      console.log('e', e);
      error(e);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getToken();
  }, []);

  console.log('loader', loader);

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
        <Stack.Screen
          name={screens.LearnWithImages}
          component={LearnWithImages}
        />
        <Stack.Screen name={screens.LearnWithQuiz} component={LearnWithQuiz} />
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
