import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { TranslateModule } from 'ng2-translate';

let routes = [
  { path: '', component: FormsComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormsComponent]
})
export class FormsPageModule { }