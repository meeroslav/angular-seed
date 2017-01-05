import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MiscComponent } from './miscellaneous.component';
import { TranslateModule } from 'ng2-translate';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

let routes = [
  { path: '', component: MiscComponent }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiscComponent]
})
export class MiscPageModule { }
