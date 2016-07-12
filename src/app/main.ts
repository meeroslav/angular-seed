/// <reference path="../../typings/browser.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode, ExceptionHandler, APP_INITIALIZER, ComponentRef } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent } from './app.component';
import { ExceptionLogger } from './_core/providers/exception-logger.service';
import { AppConfig } from './_core/providers/app-config.provider';
import { appInjector } from './_core/providers/app-injector.const';
import { APP_ROUTER_PROVIDERS } from './app.routes';

// set ng app in prod mode
if (!window['development_mode']) {
    enableProdMode();
}

// bootstrap
bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    AppConfig,
    provide(ExceptionHandler, { useClass: ExceptionLogger }),
    provide(APP_INITIALIZER, { useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig, HTTP_PROVIDERS], multi: true }),
    disableDeprecatedForms(),
    provideForms()
]).then((componentRef: ComponentRef<AppComponent>) => {
    // initialize static injector
    appInjector(componentRef.injector);
});
