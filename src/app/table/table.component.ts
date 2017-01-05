import { Component, OnInit } from '@angular/core';
import { TableService, ISWUser, ICountable } from './table.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'table-page',  // <home></home>

  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './table.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './table.component.html',
  host: {
    'class': 'page'
  }
})
export class TableComponent implements OnInit {
  collectionSize: number;
  page: number;

  users: ISWUser[];

  constructor (private service: TableService) {
    this.collectionSize = 0;
    this.users = [];
  }

  ngOnInit() {
    this.page = 1;
    this.getData();
  }

  getData() {

    this.service.getAll(this.page).subscribe((response: ICountable<ISWUser>) => {
      this.collectionSize = response.count;
      this.users = response.results;
    });
  }
}