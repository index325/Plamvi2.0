import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import store from './redux';

import Routes from './Routes';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <StatusBar backgroundColor="#ff3647" />
      <Provider store={store}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
        <FlashMessage position="bottom" />
      </Provider>
    </>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
