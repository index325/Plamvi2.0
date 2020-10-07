import { all, takeLatest, call, put } from 'redux-saga/effects';

import { AxiosResponse } from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';
import {
  cartSaveDraft,
  cartAddItem,
  cartRemoveItem,
  cartUpdateItemQuantity,
  cartLoadItems,
} from './actions';
import { alertRequest } from '../alerts/actions';
import api from '../../../services/api';
import { ActionTypes } from './types';
import { ICart } from '../../../interfaces';

type CartAdd = ReturnType<typeof cartAddItem>;
type CartRemove = ReturnType<typeof cartRemoveItem>;
type CartUpdateQuantity = ReturnType<typeof cartUpdateItemQuantity>;
type CartLoad = ReturnType<typeof cartLoadItems>;

function* add({ payload }: CartAdd) {
  const { product_id, quantity, token } = payload;

  try {
    const cartResponse: AxiosResponse<ICart> = yield call(() =>
      api.post(
        'cart_items/create',
        { product_id, quantity },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );

    yield put(cartSaveDraft(cartResponse.data));

    yield put(
      alertRequest({
        message: 'Produto adicionado com sucesso ao carrinho',
        messageType: 'success',
        isDialog: true,
      }),
    );
  } catch (error) {
    yield put(
      alertRequest({
        message: error.response.data.message,
        messageType: 'danger',
        isDialog: true,
      }),
    );
  }
}

function* remove({ payload }: CartRemove) {
  const { cart_item_id, token } = payload;

  try {
    const cartResponse: AxiosResponse<ICart> = yield call(() =>
      api.delete(`cart_items/delete/${cart_item_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    yield put(cartSaveDraft(cartResponse.data));
  } catch (error) {
    yield put(
      alertRequest({
        message: error.response.data.message,
        messageType: 'danger',
        isDialog: true,
      }),
    );
  }
}

function* updateQuantity({ payload }: CartUpdateQuantity) {
  const { cart_item_id, token, quantity } = payload;
  try {
    const cartResponse: AxiosResponse<ICart> = yield call(() =>
      api.put(
        `cart_items/update/${cart_item_id}`,
        { quantity },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: `Bearer ${token}`,
          },
        },
      ),
    );

    yield put(cartSaveDraft(cartResponse.data));
  } catch (error) {
    yield put(
      alertRequest({
        message: error.response.data.message,
        messageType: 'danger',
        isDialog: true,
      }),
    );
  }
}

function* load({ payload }: CartLoad) {
  const { token } = payload;

  try {
    const cartResponse: AxiosResponse<ICart> = yield call(() =>
      api.get('carts/verify', {
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    yield put(cartSaveDraft(cartResponse.data));
  } catch (error) {
    yield put(
      alertRequest({
        message: error.response.data.message,
        messageType: 'danger',
        isDialog: true,
      }),
    );
  }
}

export default all([
  takeLatest(ActionTypes.cartAddItem, add),
  takeLatest(ActionTypes.cartRemoveItem, remove),
  takeLatest(ActionTypes.cartUpdateItemQuantity, updateQuantity),
  takeLatest(ActionTypes.cartLoadItems, load),
]);
