/// <reference path="../../typings/browser.d.ts" />
import 'reflect-metadata';
// import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode, ExceptionHandler } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app.component';
import ExceptionLogger from './_common/services/exception-logger.service';

// set ng app in prod mode
if (!window['development_mode']) {
    enableProdMode();
}

// bootstrap
bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(ExceptionHandler, { useClass: ExceptionLogger })
]);
