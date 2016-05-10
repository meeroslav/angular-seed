/// <reference path="../../typings/browser.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';

import { AppComponent } from './app.component';

// set ng app in prod mode
if (!window['development_mode']) {
	enableProdMode();
}

// bootstrap
bootstrap(AppComponent, [
	ROUTER_PROVIDERS
]);
