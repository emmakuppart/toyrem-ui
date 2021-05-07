import { ToyremFilter } from '../api.models';
import { CategoriesEntity } from '../categories/categories.models';

export class ProductsEntity {
  id: number;
  url: string;
  product_code: string;
  category_url: string;
  name_est: string;
  name_rus: string;
  name_eng: string;
  description_est: string;
  description_rus: string;
  description_eng: string;
  price: number;
  quantity: number;
  image: string;
  additionalImages: ProductImage[];
}

export class ProductImage {
  id: number;
  image: string;
  product: number;
}

export class ProductsFilter extends ToyremFilter {
  categoriesIds: number[];
  name: string;
  description: string;
  sort: string;

  constructor(categoriesIds?: number[]) {
    super();
    this.categoriesIds = categoriesIds;
  }
}
