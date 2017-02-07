import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from './forms.component';
import { TranslateModule } from 'ng2-translate';
import { TabsModule, TooltipModule, TypeaheadModule, RatingModule } from 'ng2-bootstrap';
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
    RatingModule.forRoot(),
    CustomComponentsModule,
    RouterModule.forChild(routes)
  ],
  providers: [FormsService],
  declarations: [FormsComponent]
})
export class FormsPageModule {
}
