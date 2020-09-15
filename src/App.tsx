import 'react-native-gesture-handler';

import React from 'react';

import { Alert } from 'react-native';

import { Provider } from 'react-redux';
import store from './redux';

import Routes from './Routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
