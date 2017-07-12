import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataListComponent } from './data-list.component';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

let routes = [
  { path: '', component: DataListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DataListComponent]
})
export class DataListPageModule { }
