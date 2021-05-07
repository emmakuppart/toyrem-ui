export class CartEntity {
  id: number;
  expires: Date;
}

export class CartItemEntity {
  id: number;
  product: number;
  cart: number;
  quantity: number;
}

export class AddCartItemParams {
  product: number;
  cart: number;
  quantity: number;
}