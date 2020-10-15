import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useDispatch, useSelector } from 'react-redux';
import Cart from '../../pages/Cart';
import { cartLoadItems } from '../../redux/modules/cart/actions';
import { IState } from '../../redux';
import { IAuthState } from '../../redux/modules/auth/types';
import { IClientState } from '../../redux/modules/client/types';

const ProductRoutes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator();
  const dispatch = useDispatch();
  const { token } = useSelector<IState, IAuthState>(state => state.auth);
  const { client } = useSelector<IState, IClientState>(state => state.client);

  useEffect(() => {
    dispatch(cartLoadItems({ token, customer_id: client.id }));
  }, [dispatch, token, client]);

  return (
    <Navigator initialRouteName="Cart" screenOptions={{ headerShown: false }}>
      <Screen name="Cart" component={Cart} />
    </Navigator>
  );
};

export default ProductRoutes;
