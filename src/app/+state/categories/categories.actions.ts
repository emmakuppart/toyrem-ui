import { createAction, props } from "@ngrx/store";

import { CategoriesEntity } from "./categories.models";

export const init = createAction("[Categories Page] Init");

export const loadCategoriesSuccess = createAction(
  "[Categories/API] Load Categories Success",
  props<{ categories: CategoriesEntity[] }>()
);

export const selectCategory = createAction(
  "[Categories/API] Select Category",
  props<{ category: CategoriesEntity }>()
);
