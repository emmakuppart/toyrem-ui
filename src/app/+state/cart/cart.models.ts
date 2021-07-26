import { NamedEntity } from '../../shared/model/shared.model';

export class CartEntity {
  id: number;
  expires: Date;
  cartitem_set: CartItemEntity[];
}

export class CartItemEntity {
  id: number;
  product: CartProduct;
  quantity: number;
  price: number;
}

export class CartProduct extends NamedEntity {
  id: number;
  image: string;
}

export class AddCartItemParams {
  product: number;
  cart: number;
  quantity: number;
}