import { Component, provide } from '@angular/core';
import { Http } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslatePipe, TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { NgClass } from '@angular/common';
// import providers
import { AppConfig } from './_core/providers/app-config.provider';
import { LoadingIndicatorService } from './_core/providers/loading-indicator.service';
// import components
import { LoadingIndicatorComponent } from './_core/components/loading-indicator.component';

@Component( {
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [ROUTER_DIRECTIVES, NgClass, LoadingIndicatorComponent],
    pipes: [ TranslatePipe ],
    providers: [
        provide( TranslateLoader, {
            useFactory: ( http: Http ) => new TranslateStaticLoader( http, 'assets/locales', '.json' ),
            deps: [ Http ]
        }),
        TranslateService,
        LoadingIndicatorService,
        Title
    ]
})
export class AppComponent {
    selectedLanguage: string;
    languages: Array<string> = [];
    isMenuCollapsed = false;

    /**
     * @param  {TranslateService} privatetranslate
     * @param  {Title} privatetitle
     */
    constructor(
        private translate: TranslateService,
        private appConfig: AppConfig,
        private title: Title,
        private http: Http
    ) {
        this.initializeLanguages();
    }

    /**
     * @param  {string} userLang
     */
    changeLanguage( userLang: string ) {
        this.translate.use( userLang );
        this.selectedLanguage = userLang;
        this.translateApplicationShell();
    }

    /**
     * @param  {string} url
     * @returns boolean
     */
    getLinkStyle(url: string): boolean {
        return true;
    }

    toggleMainMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
    }

    //////////////////////////////////////////////////////
    // private methods
    /////////////////////////////////////////////////////

    private initializeLanguages() {
        this.languages = this.appConfig.data.languages.languages;
        this.initializeTranslateService(this.appConfig.data.languages.default);
        this.translateApplicationShell();
    }

    private initializeTranslateService(defaultLanguage: string) {
        var userLang = navigator.language.split( '-' )[ 0 ];
        userLang = this.languages.indexOf( userLang ) !== -1 ?
            userLang :
            defaultLanguage;

        this.translate.setDefaultLang( defaultLanguage );
        this.selectedLanguage = userLang;
        this.translate.use( userLang );
    }

    private translateApplicationShell() {
        // translate page title
        this.translate.get('APP_NAME').subscribe((data: any) => {
            this.title.setTitle(data);
        });
    }
}
