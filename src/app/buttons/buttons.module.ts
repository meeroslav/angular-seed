import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonsComponent } from './buttons.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../_common/shared/shared.module';

let routes = [
  { path: '', component: ButtonsComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ButtonsComponent]
})
export class ButtonsPageModule { }
