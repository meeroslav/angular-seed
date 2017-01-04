import { Component, OnInit } from '@angular/core';

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
  ngOnInit() {
    console.log('hello `Table` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
}