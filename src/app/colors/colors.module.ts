import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorsComponent } from './colors.component';
import { TranslateModule } from 'ng2-translate';

let routes = [
  { path: '', component: ColorsComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ColorsComponent]
})
export class ColorsPageModule { }
