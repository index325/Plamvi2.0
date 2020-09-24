import React, { useEffect } from 'react';

import { Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector, useDispatch } from 'react-redux';
import { alertReset } from '../redux/modules/alerts/actions';

import { IAlertState } from '../redux/modules/alerts/types';
import { IState } from '../redux';

import WelcomeScreen from '../pages/Welcome';
import SignUpScreen from '../pages/SignUp';
import SignInScreen from '../pages/SignIn';
import ClientSelection from '../pages/ClientSelection';
import ProductsSelection from '../pages/ProductsSelection';

const Routes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();
  const dispatch = useDispatch();
  const message = useSelector<IState, IAlertState>(state => state.alerts);

  useEffect(() => {
    if (message.isDialog) {
      Alert.alert(message.message);
      dispatch(alertReset());
    }
  }, [message, dispatch]);

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Welcome" component={WelcomeScreen} />
        <Screen name="SignIn" component={ProductsSelection} />
        <Screen name="SignUp" component={SignUpScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
