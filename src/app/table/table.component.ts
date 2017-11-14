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

  /**
   * Table relevant properties
   */
  tableCssClasses = {
    sortAscending: 'theme-icon-chevron-down',
    sortDescending: 'theme-icon-chevron-up',
    pagerLeftArrow: 'theme-icon-step-backward',
    pagerRightArrow: 'theme-icon-step-forward',
    pagerPrevious: 'theme-icon-chevron-left',
    pagerNext: 'theme-icon-chevron-right'
  };
  tableMessages = {
    emptyMessage: 'No data to display',
    totalMessage: ''
  };
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane', rating: 4 },
    { name: 'Dany', gender: 'Male', company: 'KFC', rating: 5 },
    { name: 'Molly', gender: 'Female', company: 'Burger King', rating: 3 },
  ];
  columns = [
    { prop: 'name', name: 'Name' },
    { prop: 'gender', name: 'Gender' },
    { prop: 'company', name: 'Company' },
    { prop: 'rating', name: 'Rating' }
  ];
  tableSort(data: any) {
    // data = {
    //   sorts
    //   column
    //   prevValue
    //   newValue
    // }
  }
  tablePage(data: any) {
    // {
    //   count
    //   pageSize
    //   limit
    //   offset
    // }
  }

  /**
   * CTOR
   * @param service
   */
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
