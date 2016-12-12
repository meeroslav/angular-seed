import { enableProdMode } from '@angular/core';

import './assets/styles/shared.less';

// set ng app in prod mode
if (process.env.isProduction) {
    enableProdMode();
}

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// bootstrap
platformBrowserDynamic().bootstrapModule(AppModule);

