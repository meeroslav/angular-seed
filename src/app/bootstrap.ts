/// <reference path="../../typings/browser.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';

// set ng app in prod mode
if (!window['development_mode']) {
	enableProdMode();
}

bootstrap(AppComponent);
