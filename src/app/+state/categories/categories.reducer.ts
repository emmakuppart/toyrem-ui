import { Action, createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

import * as CategoriesActions from "./categories.actions";
import { CategoriesEntity } from "./categories.models";

export const CATEGORIES_FEATURE_KEY = "categories";

export interface State extends EntityState<CategoriesEntity> {
  selectedId?: number;
  loaded: boolean;
}

export interface CategoriesPartialState {
  readonly [CATEGORIES_FEATURE_KEY]: State;
}

export const categoriesAdapter: EntityAdapter<CategoriesEntity> = createEntityAdapter<CategoriesEntity>();

export const initialState: State = categoriesAdapter.getInitialState({
  loaded: false,
});

const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) =>
    categoriesAdapter.setAll(categories, { ...state, loaded: true })
  ),
  on(CategoriesActions.selectCategory, (state, { category }) => ({
    ...state,
    selectedId: category.id
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return categoriesReducer(state, action);
}
