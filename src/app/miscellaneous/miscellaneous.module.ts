import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MiscComponent } from './miscellaneous.component';
import { TranslateModule } from 'ng2-translate';
import { CommonModule } from '@angular/common';
import { ModalDialogModule } from '../_common/modal-dialog/modal-dialog.module';
import { CustomComponentsModule } from '../_common/custom-components/custom-components.module';
import { TabsModule } from 'ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedbackModule } from '../_common/feedback/feedback.module';

let routes = [
  { path: '', component: MiscComponent }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TabsModule,
    DatepickerModule.forRoot(),
    ModalDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CustomComponentsModule,
    FeedbackModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiscComponent]
})
export class MiscPageModule { }
