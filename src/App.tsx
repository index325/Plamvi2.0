import 'react-native-gesture-handler';

import React from 'react';

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import store from './redux';

import Routes from './Routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <FlashMessage position="bottom" />
    </Provider>
  );
};

export default App;
