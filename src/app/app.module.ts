import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { appRouting } from './app.routes';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) =>
        new TranslateStaticLoader(http, 'assets/locales', `.${process.env.TRANSLATION_HASH}.json`),
      deps: [Http]
    }),
    appRouting
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
