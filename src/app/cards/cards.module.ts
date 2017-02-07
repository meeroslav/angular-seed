import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './cards.component';
import { TranslateModule } from 'ng2-translate';
import { TabsModule } from 'ng2-bootstrap';

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
