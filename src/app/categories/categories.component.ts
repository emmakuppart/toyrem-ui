import { Component, OnInit } from '@angular/core';
import { CategoriesFacade } from '../+state/categories/categories.facade';
import { CategoriesEntity } from '../+state/categories/categories.models';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../shared/model/shared.model';

@Component({
  selector: 'toyrem-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  readonly categories$ = this.facade.allCategories$;
  readonly selectedId$ = this.facade.selectedId$;

  constructor(private facade: CategoriesFacade,
              private translateService: TranslateService) { }

  ngOnInit(): void {
    this.facade.init();
  }

  selectCategory(category?: CategoriesEntity): void {
    this.facade.selectCategory(category);
  }

  getCategoryName(category: CategoriesEntity): string {
    switch (this.translateService.currentLang) {
      case Language.estonian:
        return category.name_est;
      case Language.english:
        return category.name_eng;
      case Language.russian:
        return category.name_rus;
    }
  }
}
