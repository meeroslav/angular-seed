import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorsComponent } from './colors.component';
import { TranslateModule } from '@ngx-translate/core';

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
