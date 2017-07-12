import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appRouting } from './app.routes';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './_layout/header.component';
import { MainNavComponent } from './_layout/mainnav.component';
import { DispatcherModule } from './_common/dispatcher/dispatcher.module';
import { FooterComponent } from './_layout/footer.component';
import { MainNav } from './_layout/mainnav.service';
import { CommonModule } from '@angular/common';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { TabsModule, PaginationModule, BsDropdownModule } from 'ngx-bootstrap';
import { LoadingIndicatorModule } from './_common/locading-indicator/loading-indicator.module';
import { FeedbackModule } from './_common/feedback/feedback.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    DispatcherModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: Http) => new TranslateHttpLoader(http, 'assets/locales/', `.${process.env.TRANSLATION_HASH}.json`),
        deps: [Http]
      }
    }),
    // ngx-bootstrap stuff
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
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
