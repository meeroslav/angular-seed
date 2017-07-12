import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MiscComponent } from './miscellaneous.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { CustomComponentsModule } from '../_common/custom-components/custom-components.module';
import { TabsModule } from 'ngx-bootstrap';
import { DatepickerModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_common/shared/shared.module';

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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiscComponent]
})
export class MiscPageModule { }
