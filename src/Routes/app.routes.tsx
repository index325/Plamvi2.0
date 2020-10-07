import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ClientSelection from '../pages/ClientSelection';

import Home from './home.routes';

const AuthRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

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
