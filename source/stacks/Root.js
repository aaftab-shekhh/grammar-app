import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../constants/colors';
import {screens} from '../constants/screens';
import Home from '../screens/Home';
import LearnWithImages from '../screens/LearnWithImages';
import LearnWithQuiz from '../screens/LearnWithQuiz';
import SelectLevel from '../screens/SelectLevel';
import SelectSet from '../screens/SelectSet';
import Setting from '../screens/Setting';

const Stack = createNativeStackNavigator();

const Root = () => {
  const {bottom} = useSafeAreaInsets();

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
