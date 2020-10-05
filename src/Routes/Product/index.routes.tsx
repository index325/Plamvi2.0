import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ProductDetail from '../../pages/ProductDetail';
import ProductsSelection from '../../pages/ProductsSelection';

const ProductRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      initialRouteName="ProductsSelection"
      screenOptions={{ headerShown: false }}
    >
      <Screen name="ProductsSelection" component={ProductsSelection} />
      <Screen name="ProductDetail" component={ProductDetail} />
    </Navigator>
  );
};

export default ProductRoutes;
