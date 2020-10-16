import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Config from '../../pages/Config';
import UpdateUserInfo from '../../pages/Config/UpdateUserInfo';
import UpdateUserPassword from '../../pages/Config/UpdateUserPassword';

const ConfigRouter: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName="Config" screenOptions={{ headerShown: false }}>
      <Screen name="Config" component={Config} />
      <Screen name="UpdateUserInfo" component={UpdateUserInfo} />
      <Screen name="UpdateUserPassword" component={UpdateUserPassword} />
    </Navigator>
  );
};

export default ConfigRouter;
