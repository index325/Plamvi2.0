import { combineReducers } from 'redux';
import auth from './auth/reducer';
import alerts from './alerts/reducer';

export default combineReducers({
  auth,
  alerts,
});
