export interface IUser {
  email: string;
  name: string;
}

export interface IClient {
  id: string;
  name: string;
  email: string;
  avatar: string;
  paid: boolean;
  city: string;
  state: string;
  avatarUrl: string;
}

export interface IProduct {
  id: string;
  name: string;
  image_url: string;
  price: number;
  sku: string;
  short_description: string;
  description: string;
  customer_id: string;
}

export interface ICart {
  id: string;
  opened: boolean;
  user_id: string;
  cart_item: ICartItem[];
}

export interface ICartItem {
  id: string;
  quantity: string;
  product_id: string;
  cart_id: string;
  product: IProduct;
}

export interface IFailureMessage {
  message: string;
  messageType: string;
  isDialog: boolean;
}
