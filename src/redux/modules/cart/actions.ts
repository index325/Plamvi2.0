import { ICart } from '../../../interfaces';
import {
  ActionTypes,
  IItemAdd,
  IItemRemove,
  IItemUpdateQuantity,
  ILoadItem,
} from './types';

export function cartAddItem(itemAdd: IItemAdd) {
  return {
    type: ActionTypes.cartAddItem,
    payload: {
      token: itemAdd.token,
      product_id: itemAdd.product_id,
      quantity: itemAdd.quantity,
    },
  };
}

export function cartRemoveItem(itemRemove: IItemRemove) {
  return {
    type: ActionTypes.cartRemoveItem,
    payload: {
      cart_item_id: itemRemove.cart_item_id,
      token: itemRemove.token,
    },
  };
}

export function cartUpdateItemQuantity(itemUpdate: IItemUpdateQuantity) {
  return {
    type: ActionTypes.cartUpdateItemQuantity,
    payload: {
      token: itemUpdate.token,
      cart_item_id: itemUpdate.cart_item_id,
      quantity: itemUpdate.quantity,
    },
  };
}

export function cartSaveDraft(cart: ICart) {
  return {
    type: ActionTypes.cartSaveDraft,
    payload: {
      cart,
    },
  };
}

export function cartLoadItems({ token, customer_id }: ILoadItem) {
  return {
    type: ActionTypes.cartLoadItems,
    payload: {
      token,
      customer_id,
    },
  };
}
