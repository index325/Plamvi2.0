import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Cart from '../../pages/Cart';

const ProductRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName="Cart" screenOptions={{ headerShown: false }}>
      <Screen name="Cart" component={Cart} />
    </Navigator>
  );
};

export default ProductRoutes;
