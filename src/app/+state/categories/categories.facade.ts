import { Injectable } from "@angular/core";

import { select, Store } from "@ngrx/store";

import * as CategoriesActions from "./categories.actions";
import * as CategoriesSelectors from "./categories.selectors";
import { CategoriesEntity } from './categories.models';

@Injectable()
export class CategoriesFacade {
  allCategories$ = this.store.pipe(select(CategoriesSelectors.getAllCategories));

  constructor(private store: Store) {}

  init(): void {
    this.store.dispatch(CategoriesActions.init());
  }

  selectCategory(category?: CategoriesEntity) {
    this.store.dispatch(CategoriesActions.selectCategory({ category: category }));
  }
}
