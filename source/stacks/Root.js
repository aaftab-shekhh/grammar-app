import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {screens} from '../constants/screens';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={screens.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Root);

const styles = StyleSheet.create({});
