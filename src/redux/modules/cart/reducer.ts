import { Reducer } from 'redux';
import produce from 'immer';
import { ActionTypes, ICartState } from './types';
import { ICart } from '../../../interfaces';

const INITIAL_STATE: ICartState = {
  cart: {} as ICart,
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.cartSaveDraft: {
        const { cart } = action.payload;

        draft.cart = cart;

        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default cart;
