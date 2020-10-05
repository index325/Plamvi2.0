import React, { useEffect } from 'react';

import { Alert } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { useSelector, useDispatch } from 'react-redux';
import { alertReset } from '../redux/modules/alerts/actions';

import { IAlertState } from '../redux/modules/alerts/types';
import { IState } from '../redux';

import ClientSelection from '../pages/ClientSelection';

import Home from './home.routes';

const AuthRoutes: React.FC = () => {
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
    <Navigator
      initialRouteName="ClientSelection"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="ClientSelection" component={ClientSelection} />
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};

export default AuthRoutes;
