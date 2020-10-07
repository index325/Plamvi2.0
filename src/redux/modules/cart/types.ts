import { ICart } from '../../../interfaces';

export enum ActionTypes {
  cartAddItem = 'CART_ADD_ITEM',
  cartRemoveItem = 'CART_REMOVE_ITEM',
  cartLoadItems = 'CART_LOAD_ITEMS',
  cartUpdateItemQuantity = 'CART_UPDATE_ITEM_QUANTITY',
  cartSaveDraft = 'CART_SAVE_DRAFT',
}

export interface IItemAdd {
  token: string;
  product_id: string;
  quantity: number;
}

export interface IItemRemove {
  token: string;
  cart_item_id: string;
}

export interface IItemUpdateQuantity {
  token: string;
  cart_item_id: string;
  quantity: number;
}

export interface ICartState {
  cart: ICart;
}
