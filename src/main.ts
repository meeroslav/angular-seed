import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Styles
import './assets/styles/theme.scss';
import './assets/styles/themeicons.scss';
import './assets/styles/components/breadcrumbs.scss';
import './assets/styles/components/typeahead.scss';
import 'ngx-bootstrap/datepicker/bs-datepicker.css';

// depending on the env mode, enable prod mode or add debugging modules
if (environment.production) {
  enableProdMode();
}

export function main() {
  'use strict';

  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
