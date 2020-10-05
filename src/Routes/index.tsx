import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../redux';
import { alertReset } from '../redux/modules/alerts/actions';
import { IAlertState } from '../redux/modules/alerts/types';
import { IAuthState } from '../redux/modules/auth/types';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes = () => {
  const { user } = useSelector<IState, IAuthState>(state => state.auth);

  const dispatch = useDispatch();
  const message = useSelector<IState, IAlertState>(state => state.alerts);

  useEffect(() => {
    if (message.isDialog) {
      Alert.alert(message.message);
      dispatch(alertReset());
    }
  }, [message, dispatch]);

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
