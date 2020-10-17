import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../pages/Welcome';
import SignUpScreen from '../pages/SignUp';
import SignInScreen from '../pages/SignIn';
import RecoverPasswordScreen from '../pages/RecoverPassword';
import ForgotPasswordScreen from '../pages/ForgotPassword';

const AuthRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Welcome" component={WelcomeScreen} />
      <Screen name="SignIn" component={SignInScreen} />
      <Screen name="SignUp" component={SignUpScreen} />
      <Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Screen name="RecoverPassword" component={RecoverPasswordScreen} />
    </Navigator>
  );
};

export default AuthRoutes;
