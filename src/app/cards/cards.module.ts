import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './cards.component';
import { TranslateModule } from '@ngx-translate/core';
import { TabsModule } from 'ngx-bootstrap';

let routes = [
  { path: '', component: CardsComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    TabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CardsComponent]
})
export class CardsPageModule { }
