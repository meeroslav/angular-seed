import { Component, provide } from '@angular/core';
import { Http } from '@angular/http';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';
import { TranslatePipe, TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
// import components
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';

@Component({
	selector: 'app',
	templateUrl: 'app/app.html',
	directives: [ ROUTER_DIRECTIVES ],
	pipes: [ TranslatePipe ],
	providers: [
		provide(TranslateLoader, {
			useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/locales', '.json'),
			deps: [Http]
		}),
		TranslateService
	]
})
@Routes([
	{ path: '/', component: HomeComponent },
	{ path: '/games', component: GamesComponent },
	{ path: '/login', component: LoginComponent },
	// default view
	{ path: '*', component: HomeComponent }
])
export class AppComponent {

	constructor(private translate: TranslateService) {
		this.initializeTranslateServiceConfig();
	}

	public changeLanguage = (lang: string) => {
		this.translate.use(lang);
	}

	private initializeTranslateServiceConfig = () => {
		var userLang = navigator.language.split('-')[0];
		userLang = /(rs|en)/gi.test(userLang) ? userLang : 'en';

		this.translate.setDefaultLang('en');
		this.translate.use(userLang);
	}
}
