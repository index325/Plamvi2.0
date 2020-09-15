export enum ActionTypes {
  authRequest = 'AUTH_REQUEST',
  authSuccess = 'AUTH_SUCCESS',
  authFailure = 'AUTH_FAILURE',
}

export interface IUser {
  name: string;
  email: string;
  city: string;
  state: string;
}

export interface IAuthState {
  user: IUser;
  token: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
}

// export interface IProduct {
//   id: number;
//   title: string;
//   price: number;
// }

// export interface ICartItem {
//   product: IProduct;
//   quantity: number;
// }

// export interface ICartState {
//   items: ICartItem[];
//   failedStockCheck: number[];
// }
