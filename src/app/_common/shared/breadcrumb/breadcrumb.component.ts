import { Component, Input } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'breadcrumb',
  template: `
    <div class="page-header">
      <div class="page-header-info">
        <h1 *ngIf="pageTitle">
          {{ pageTitle | translate }}
          <span class="ml-2 page-subtitle badge badge-success" *ngIf="pageSubtitle">{{ pageSubtitle | translate }}</span>
        </h1>
        <ol class="breadcrumb mb-0 mt-1" *ngIf="service.breadcrumbs.length">
          <li *ngFor="let crumb of service.breadcrumbs"
              class="breadcrumb-item" [ngClass]="{active: !crumb.url}">
            <a [class]="crumb.icon" [routerLink]="crumb.url" *ngIf="crumb.url">{{crumb.text | translate}}</a>
            <span [class]="crumb.icon" *ngIf="!crumb.url">{{crumb.text | translate}}</span>
          </li>
        </ol>
      </div>
      <div class="page-header-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .breadcrumb-item [class^="app-icon-"]:before, .breadcrumb-item [class*=" app-icon-"]:before,
    .breadcrumb-item [class^="theme-icon-"]:before, .breadcrumb-item [class*=" theme-icon-"]:before {
      padding-right: .5rem;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() pageTitle: string;
  @Input() pageSubtitle: string;

  /**
   * CTOR
   * @param service
   */
  constructor(protected service: BreadcrumbService) {
  }
}
