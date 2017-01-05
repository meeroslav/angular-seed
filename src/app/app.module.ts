import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { appRouting } from './app.routes';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './_layout/header.component';
import { MainNavComponent } from './_layout/mainnav.component';
import { DispatcherModule } from './_common/dispatcher/dispatcher.module';
import { FooterComponent } from './_layout/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainNav } from './_layout/mainnav.service';
import { CommonModule } from '@angular/common';
import { ModalDialogModule } from './_common/modal-dialog/modal-dialog.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    DispatcherModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) =>
        new TranslateStaticLoader(http, 'assets/locales', `.${process.env.TRANSLATION_HASH}.json`),
      deps: [Http]
    }),
    NgbModule.forRoot(),
    ModalDialogModule.forRoot(),
    appRouting
  ],
  declarations: [AppComponent, HeaderComponent, MainNavComponent, FooterComponent],
  providers: [MainNav],
  bootstrap: [AppComponent]
})
export class AppModule {
}
