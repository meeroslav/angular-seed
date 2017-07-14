import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from './forms.component';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule, TooltipModule, TypeaheadModule, RatingModule } from 'ngx-bootstrap';
import { FormsService } from './forms.service';
import { CustomComponentsModule } from '../_common/custom-components/custom-components.module';

let routes = [
  { path: '', component: FormsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    RatingModule,
    CustomComponentsModule,
    RouterModule.forChild(routes)
  ],
  providers: [FormsService],
  declarations: [FormsComponent]
})
export class FormsPageModule {
}
