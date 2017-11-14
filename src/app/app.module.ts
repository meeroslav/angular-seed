import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { appRouting } from './app.routes';
import { NgModule } from '@angular/core';
import { DispatcherModule } from './_common/dispatcher/dispatcher.module';
import { CommonModule } from '@angular/common';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { TabsModule, PaginationModule, BsDropdownModule, RatingModule } from 'ngx-bootstrap';
import { SharedModule } from './_common/shared/shared.module';
import { LayoutModule } from './_layout/layout.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/locales/', `.${process.env.TRANSLATION_HASH}.json`);
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    DispatcherModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // ngx-bootstrap stuff
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    RatingModule.forRoot(),
    // custom stuff
    ModalDialogModule.forRoot(),
    SharedModule.forRoot(),
    LayoutModule,
    // routes
    appRouting
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
