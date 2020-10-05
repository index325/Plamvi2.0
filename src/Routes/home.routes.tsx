import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductSelection from './Product/index.routes';
import Cart from './Cart/index.routes';

const { Navigator, Screen } = createBottomTabNavigator();

export default function DashboardRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      backBehavior="none"
      tabBarOptions={{
        inactiveTintColor: 'gray',
      }}
    >
      <Screen
        name="Products"
        component={ProductSelection}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="shopping-outline"
              size={32}
              color={focused ? '#ff3647' : 'grey'}
            />
          ),
        }}
      />
      <Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="cart-outline"
              size={32}
              color={focused ? '#ff3647' : 'grey'}
            />
          ),
        }}
      />
    </Navigator>
  );
}
