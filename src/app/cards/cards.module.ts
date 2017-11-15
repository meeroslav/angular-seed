import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './cards.component';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap';
import { SharedModule } from '../_common/shared/shared.module';

let routes = [
  { path: '', component: CardsComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    TabsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CardsComponent]
})
export class CardsPageModule { }
