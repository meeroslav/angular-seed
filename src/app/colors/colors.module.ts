import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorsComponent } from './colors.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../_common/shared/shared.module';

let routes = [
  { path: '', component: ColorsComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ColorsComponent]
})
export class ColorsPageModule { }
