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
import { MainNav } from './_layout/mainnav.service';
import { CommonModule } from '@angular/common';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { TabsModule, PaginationModule } from 'ng2-bootstrap';
import { LoadingIndicatorModule } from './_common/locading-indicator/loading-indicator.module';
import { FeedbackModule } from './_common/feedback/feedback.module';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    DispatcherModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) =>
        new TranslateStaticLoader(http, 'assets/locales', `.${process.env.TRANSLATION_HASH}.json`),
      deps: [Http]
    }),
    // ng2-bootstrap stuff
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    DropdownModule.forRoot(),
    // custom stuff
    ModalDialogModule.forRoot(),
    LoadingIndicatorModule.forRoot(),
    FeedbackModule.forRoot(),
    // routes
    appRouting
  ],
  declarations: [AppComponent, HeaderComponent, MainNavComponent, FooterComponent],
  providers: [MainNav],
  bootstrap: [AppComponent]
})
export class AppModule {
}
