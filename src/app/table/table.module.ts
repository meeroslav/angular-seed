import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { TableComponent } from './table.component';
import { TableService } from './table.service';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TabsModule, PaginationModule } from 'ng2-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let routes = [
  { path: '', component: TableComponent }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    TabsModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TableComponent],
  providers: [TableService]
})
export class TablePageModule { }
