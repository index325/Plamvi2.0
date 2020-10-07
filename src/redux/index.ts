import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules/rootReducer';

import { IAlertState } from './modules/alerts/types';
import rootSaga from './modules/rootSaga';
import { IAuthState } from './modules/auth/types';
import { IClientState } from './modules/client/types';
import { ICartState } from './modules/cart/types';

export interface IState {
  auth: IAuthState;
  alerts: IAlertState;
  client: IClientState;
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);

export default store;
