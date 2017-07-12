import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonsComponent } from './buttons.component';
import { TranslateModule } from '@ngx-translate/core';

let routes = [
  { path: '', component: ButtonsComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ButtonsComponent]
})
export class ButtonsPageModule { }
