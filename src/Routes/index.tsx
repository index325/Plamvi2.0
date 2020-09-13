import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../pages/Welcome';
import SignUpScreen from '../pages/SignUp';

const Routes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Welcome" component={WelcomeScreen} />
        <Screen name="SignIn" component={WelcomeScreen} />
        <Screen name="SignUp" component={SignUpScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
