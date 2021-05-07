import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './shared/model/shared.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly defaultLanguage = Language.estonian;

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang(this.defaultLanguage);
    this.useLanguage(this.defaultLanguage);
  }

  useLanguage(language: Language): void {
    this.translateService.use(language);
  }
}
