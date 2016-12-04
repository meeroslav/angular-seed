import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate/ng2-translate';

@Component( {
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    selectedLanguage: string;
    languages: Array<string> = [];

    /**
     * @param translate
     * @param title
     */
    constructor(
        private translate: TranslateService,
        private title: Title
    ) {
        this._initializeLanguages();
    }

    //////////////////////////////////////////////////////
    // private methods
    /////////////////////////////////////////////////////

    private _initializeLanguages() {
        // this.languages = this.appConfig.data.languages.languages;
        // this._initializeTranslateService(this.appConfig.data.languages.default);
        this.languages = ['en', 'de'];
        this._initializeTranslateService('en');
        this._translateApplicationShell();
    }

    private _initializeTranslateService(defaultLanguage: string) {
        var userLang = navigator.language.split( '-' )[ 0 ];
        userLang = this.languages.indexOf( userLang ) !== -1 ?
            userLang :
            defaultLanguage;

        this.translate.setDefaultLang( defaultLanguage );
        this.selectedLanguage = userLang;
        this.translate.use( userLang );
    }

    private _translateApplicationShell() {
        // translate page title
        this.translate.get('APP_NAME').subscribe((data: any) => {
            this.title.setTitle(data);
        });
    }
}
