import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from './table.component';
import { TableService } from './table.service';
import { CommonModule } from '@angular/common';
import { TabsModule, PaginationModule, RatingModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../_common/shared/shared.module';

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
    HttpClientModule,
    NgxDatatableModule,
    RatingModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TableComponent],
  providers: [TableService]
})
export class TablePageModule { }
