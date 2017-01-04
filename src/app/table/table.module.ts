import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { TableComponent } from './table.component';

let routes = [
  { path: '', component: TableComponent }
];

@NgModule({
  imports: [
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TableComponent]
})
export class TablePageModule { }