import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormsComponent} from './forms.component';
import {TranslateModule} from 'ng2-translate';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

let routes = [
  {path: '', component: FormsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormsComponent]
})
export class FormsPageModule {
}
