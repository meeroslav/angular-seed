import { Component, provide } from '@angular/core';
import { Http } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslatePipe, TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
// import components
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
// import providers
import LanguageConfig from './_common/providers/language-config.provider';

@Component( {
    selector: 'app',
    templateUrl: 'app/app.html',
    directives: [ ROUTER_DIRECTIVES ],
    pipes: [ TranslatePipe ],
    providers: [
        LanguageConfig,
        provide( TranslateLoader, {
            useFactory: ( http: Http ) => new TranslateStaticLoader( http, 'assets/locales', '.json' ),
            deps: [ Http ]
        }),
        TranslateService,
        Title
    ]
})
@Routes( [
    { path: '/home', component: HomeComponent },
    { path: '/games', component: GamesComponent },
    // default view
    { path: '*', component: HomeComponent }
] )
export class AppComponent {
    public selectedLanguage: string;
    public languages: Array<string> = [];

    /**
     * @param  {TranslateService} privatetranslate
     * @param  {Title} privatetitle
     */
    constructor(
        private translate: TranslateService,
        private languageConfig: LanguageConfig,
        private title: Title,
        private http: Http
    ) {
        this.initializeLanguages();
    }

    /**
     * @param  {string} userLang
     */
    public changeLanguage( userLang: string ) {
        this.translate.use( userLang );
        this.selectedLanguage = userLang;
        this.translateApplicationShell();
    }

    /**
     * @param  {string} url
     * @returns boolean
     */
    public getLinkStyle(url: string): boolean {
        return true;
    }

    //////////////////////////////////////////////////////
    // private methods
    /////////////////////////////////////////////////////

    private initializeLanguages() {
        this.languageConfig.data.subscribe((res: any) => {
            this.languages = res.languages;
            this.initializeTranslateService(res.default || res.languages[0]);
            this.translateApplicationShell();
        });
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
