import { Product } from '../../+state/products/products.models';

export enum Language {
  estonian = 'et',
  english = 'en',
  russian = 'ru'
}

export enum InputType {
  text = 'text'
}

export abstract class NamedEntity {
  name_est: string;
  name_rus: string;
  name_eng: string;

  static getName(product: Product, language: Language): string {
    switch (language) {
      case Language.estonian:
        return product.name_est;
      case Language.russian:
        return product.name_rus;
      case Language.english:
        return product.name_eng;
      default:
        return product.name_est;
    }
  }
}