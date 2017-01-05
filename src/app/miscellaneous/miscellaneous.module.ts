import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MiscComponent } from './miscellaneous.component';
import { TranslateModule } from 'ng2-translate';

let routes = [
  { path: '', component: MiscComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiscComponent]
})
export class MiscPageModule { }
