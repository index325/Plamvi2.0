import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { IState } from '../redux';
import { IAlertState } from '../redux/modules/alerts/types';
import { loadUser } from '../redux/modules/auth/actions';
import { IAuthState } from '../redux/modules/auth/types';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes = () => {
  const { user } = useSelector<IState, IAuthState>(state => state.auth);

  const dispatch = useDispatch();
  const message = useSelector<IState, IAlertState>(state => state.alerts);

  useEffect(() => {
    if (message.isDialog) {
      showMessage({
        message: 'Nova mensagem',
        description: message.message,
        type: message.messageType,
        floating: true,
      });
    }
  }, [message, dispatch]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return user?.name ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
