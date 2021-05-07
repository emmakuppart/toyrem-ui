import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  CATEGORIES_FEATURE_KEY,
  State,
  CategoriesPartialState,
  categoriesAdapter,
} from "./categories.reducer";

const getCategoriesState = createFeatureSelector<
  CategoriesPartialState,
  State
>(CATEGORIES_FEATURE_KEY);

const { selectAll } = categoriesAdapter.getSelectors();

export const getAllCategories = createSelector(
  getCategoriesState,
  (state: State) => selectAll(state)
);

export const getParentCategories = createSelector(
  getAllCategories,
  (categories) => categories.filter(category => !category.parentCategory)
);

export const getChildrenCategories = createSelector(
  getCategoriesState,
  getAllCategories,
  (state: State, categories) =>
    categories.filter(category => state.selectedId
      && category.id !== state.selectedId
      && category.parentCategory?.id === state.selectedId)
);
