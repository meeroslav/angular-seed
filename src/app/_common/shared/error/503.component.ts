import { Component } from '@angular/core';

@Component({
  selector: 'error-503-component',
  styleUrls: ['./error.component.scss'],
  host: {
    'id': 'error-page'
  },
  template: `
    <div id="error-logo">
      <span class="monster-layer" *ngFor="let m of [1,2,3,4,5]">
        <span class="monster-eye"></span>
        <span class="app-icon-game monster"></span>
        <span class="monster-retina"></span>
      </span>
    </div>
    <h1 id="error-heading">{{ 'error.503_ERROR_HEADING' | translate }}</h1>
    <p>{{ 'error.503_ERROR_MESSAGE' | translate}}</p>
  `
})
export class Error503Component {
}
