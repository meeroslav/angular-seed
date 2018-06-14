import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedLanguage: string;
  languages: Array<string> = [];

  /**
   * @param translateService
   * @param title
   */
  constructor(private translateService: TranslateService,
              private title: Title) {
    this._initializeLanguages();
    defineLocale('de', deLocale);
  }

  //////////////////////////////////////////////////////
  // private methods
  /////////////////////////////////////////////////////

  private _initializeLanguages() {
    // this.languages = this.appConfig.data.languages.languages;
    // this._initializeTranslateService(this.appConfig.data.languages.default);
    this.languages = ['en', 'de'];
    this._initializeTranslateService('en');
  }

  private _initializeTranslateService(defaultLanguage: string) {
    let userLang = navigator.language.split('-')[0];
    userLang = this.languages.indexOf(userLang) !== -1 ?
      userLang :
      defaultLanguage;

    this.translateService.setDefaultLang(defaultLanguage);
    this.selectedLanguage = userLang;
    this.translateService.use(userLang).subscribe(() => {
      // translateService page title
      this.title.setTitle(this.translateService.instant('APP_NAME'));
    });
  }
}
