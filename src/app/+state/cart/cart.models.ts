export class CartEntity {
  id: number;
  expires: Date;
  cartitem_set: CartItemEntity[];
}

export class CartItemEntity {
  id: number;
  product: CartProduct;
  quantity: number;
}

export class CartProduct {
  id: number;
  image: string;
}

export class AddCartItemParams {
  product: number;
  cart: number;
  quantity: number;
}