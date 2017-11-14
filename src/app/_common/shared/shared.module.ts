import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components and directives
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ToasterComponent } from './feedback/toaster.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { Error403Component, Error404Component, Error503Component, ErrorService } from './error';
// services
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { FeedbackService } from './feedback/feedback.service';
import { LoadingIndicatorService } from './loading-indicator/loading-indicator.service';
// modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  TabsModule, BsDropdownModule, PaginationModule, TooltipModule, RatingModule,
  TypeaheadModule, ButtonsModule, DatepickerModule, AlertModule
} from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    // ngx-bootstrap modules
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    RatingModule.forRoot()
  ],
  declarations: [BreadcrumbComponent, ToasterComponent, LoadingIndicatorComponent,
    Error404Component, Error403Component, Error503Component],
  exports: [BreadcrumbComponent, ToasterComponent, LoadingIndicatorComponent,
    Error404Component, Error403Component, Error503Component]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        BreadcrumbService,
        FeedbackService,
        LoadingIndicatorService,
        ErrorService
      ]
    };
  }
}
