import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableService, ISWUser, ICountable } from './table.service';

@Component({
  selector: 'table-page',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {
  @ViewChild('editButtonTemplate') editButtonTemplate: TemplateRef<any>;
  @ViewChild('ratingTemplate') ratingTemplate: TemplateRef<any>;
  @ViewChild('hobbiesTemplate') hobbiesTemplate: TemplateRef<any>;

  collectionSize: number;

  users: ISWUser[] = [];
  sorting = [];
  pageSize = 10;
  page = 0;
  rowHeight = undefined;

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
  forceColumns = [];
  swColumns = [];

  /**
   * CTOR
   * @param service
   */
  constructor(private service: TableService) {
    this.collectionSize = 0;
    this.users = [];
  }

  ngOnInit() {
    this.page = 0;
    this.getData();

    this.columns = [
      { prop: 'name', name: 'Name', sortable: false, resizeable: false, flexGrow: 2 },
      { prop: 'gender', name: 'Gender', sortable: false, resizeable: false, flexGrow: 1 },
      { prop: 'company', name: 'Company', sortable: false, resizeable: false, flexGrow: 2 },
      {
        prop: 'rating',
        name: 'Rating',
        sortable: false,
        resizeable: false,
        cellTemplate: this.ratingTemplate,
        flexGrow: 0.5
      },
      {
        prop: 'hobbies',
        name: 'Hobbies',
        sortable: false,
        resizeable: false,
        cellTemplate: this.hobbiesTemplate,
        flexGrow: 2
      },
      {
        prop: 'name',
        name: '',
        sortable: false,
        resizeable: false,
        cellTemplate: this.editButtonTemplate,
        flexGrow: 0.5
      }
    ];
    this.forceColumns = [
      { prop: 'name', name: 'Name', sortable: false, resizeable: false, minWidth: 50 },
      { prop: 'gender', name: 'Gender', sortable: false, resizeable: false, minWidth: 70, maxWidth: 70 },
      { prop: 'company', name: 'Company', sortable: false, resizeable: false, minWidth: 70 },
      {
        prop: 'rating',
        name: 'Rating',
        sortable: false,
        resizeable: false,
        cellTemplate: this.ratingTemplate,
        minWidth: 70,
        maxWidth: 70
      },
      {
        prop: 'hobbies',
        name: 'Hobbies',
        sortable: false,
        resizeable: false,
        cellTemplate: this.hobbiesTemplate,
        minWidth: 150
      },
      {
        prop: 'name',
        name: '',
        sortable: false,
        resizeable: false,
        cellTemplate: this.editButtonTemplate,
        minWidth: 40,
        maxWidth: 40
      }
    ];
    this.rows = [
      { name: 'Austin', gender: 'Male', company: 'Swimlane', rating: 4, hobbies: ['Reading', 'Swimming'] },
      { name: 'Dany', gender: 'Male', company: 'KFC', rating: 5, hobbies: ['Coding', 'Playing guitar'] },
      {
        name: 'Molly',
        gender: 'Female',
        company: 'Burger King',
        rating: 3,
        hobbies: ['Skiing', 'Snowboarding', 'Running', 'Climbing', 'Paragliding', 'Freeclimbing']
      }
    ];
    this.swColumns = [
      { prop: 'name', name: 'Name', resizeable: false },
      { prop: 'height', name: 'Height', resizeable: false, width: 50 },
      { prop: 'mass', name: 'Mass', resizeable: false, width: 50 },
      { prop: 'gender', name: 'Gender', resizeable: false, width: 70 },
      { prop: 'birth_year', name: 'Birth year', resizeable: false, width: 70 },
      { prop: 'url', cellTemplate: this.editButtonTemplate, sortable: false, width: 50, resizeable: false }
    ];
  }

  reportClick(value: any) {
    alert(value);
  }

  getData() {
    this.setPage({ offset: this.page });
  }

  setPage(pageEvent: any) {
    this.service.getAll(pageEvent.offset + 1).subscribe((response: ICountable<ISWUser>) => {
      this.collectionSize = response.count;
      this.users = response.results;
    });
  }
}
