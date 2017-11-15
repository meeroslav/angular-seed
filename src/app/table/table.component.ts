import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableService, ISWUser, ICountable } from './table.service';

@Component({
  selector: 'table-page',
  styleUrls: [ './table.component.scss' ],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  @ViewChild('editButtonTemplate') editButtonTemplate: TemplateRef<any>;
  @ViewChild('ratingTemplate') ratingTemplate: TemplateRef<any>;

  collectionSize: number;

  users: ISWUser[] = [];
  sorting = [];
  pageSize = 10;
  page = 0;

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
  rows = [];
  columns = [];
  swColumns = [];

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

    this.columns = [
      { prop: 'name', name: 'Name', sortable: false, resizeable: false },
      { prop: 'gender', name: 'Gender', sortable: false, resizeable: false },
      { prop: 'company', name: 'Company', sortable: false, resizeable: false },
      { prop: 'rating', name: 'Rating', sortable: false, resizeable: false, cellTemplate: this.ratingTemplate }
    ];
    this.rows = [
      { name: 'Austin', gender: 'Male', company: 'Swimlane', rating: 4 },
      { name: 'Dany', gender: 'Male', company: 'KFC', rating: 5 },
      { name: 'Molly', gender: 'Female', company: 'Burger King', rating: 3 },
    ];
    this.swColumns = [
      { prop: 'name', name: 'Name', resizeable: false },
      { prop: 'height', name: 'Height', resizeable: false, width: 50 },
      { prop: 'mass', name: 'Mass', resizeable: false, width: 50 },
      { prop: 'gender', name: 'Gender', resizeable: false, width: 70 },
      { prop: 'birth_year', name: 'Birth year', resizeable: false, width: 70 },
      { prop: 'url', name: 'dzend', cellTemplate: this.editButtonTemplate, sortable: false, width: 50, resizeable: false }
    ];
  }

  reportClick(value: any) {
    alert(value);
  }

  getData() {
    this.setPage({ offset: 0 });
  }

  setPage(pageEvent: any) {
    this.service.getAll(pageEvent.offset + 1).subscribe((response: ICountable<ISWUser>) => {
      this.collectionSize = response.count;
      this.users = response.results;
    });
  }
}
