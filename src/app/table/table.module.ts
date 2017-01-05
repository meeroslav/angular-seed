import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { TableComponent } from './table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from './table.service';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

let routes = [
  { path: '', component: TableComponent }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TableComponent],
  providers: [TableService]
})
export class TablePageModule { }
