import { Component } from '@angular/core';

@Component({
  selector: 'error-403-component',
  styleUrls: ['./error.component.scss'],
  host: {
    'id': 'error-page'
  },
  template: `
    <div id="error-logo">
        <span class="monster-layer" *ngFor="let m of [1,2,3,4,5]">
            <span class="monster-eye"></span>
            <span class="theme-icon-close monster"></span>
        </span>
    </div>
    <h1 id="error-heading">{{ 'error.403_ERROR_HEADING' | translate }}</h1>
    <p>{{ 'error.403_ERROR_MESSAGE' | translate }}</p>
    <span [innerHTML]="'error.RETURN_TO_PAGE' | translate:{linkStart: linkStart, linkEnd: linkEnd}"></span>
  `
})
export class Error403Component {
  linkStart: string;
  linkEnd: string;

  constructor() {
    this.linkStart = '<a href="/">';
    this.linkEnd = '</a>';
  }
}
