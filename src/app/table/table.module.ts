import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { TableComponent } from './table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

let routes = [
  { path: '', component: TableComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TableComponent]
})
export class TablePageModule { }