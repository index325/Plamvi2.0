import { combineReducers } from 'redux';
import auth from './auth/reducer';
import alerts from './alerts/reducer';
import client from './client/reducer';
import cart from './cart/reducer';

export default combineReducers({
  auth,
  alerts,
  client,
  cart,
});
