export class CategoriesEntity {
  id: number;
  name_est: string;
  name_rus: string;
  name_eng: string;
  parentCategory: CategoriesEntity;
}