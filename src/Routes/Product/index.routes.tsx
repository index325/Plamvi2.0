import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useDispatch } from 'react-redux';
import ProductDetail from '../../pages/ProductDetail';
import ProductsSelection from '../../pages/ProductsSelection';
import { clientLoad } from '../../redux/modules/client/actions';

const ProductRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clientLoad());
  }, [dispatch]);

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
