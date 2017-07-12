import { Component } from '@angular/core';
import { DispatcherService } from '../_common/dispatcher/dispatcher.service';
import { MAIN_MENU_TOGGLE } from './layout.interface';
import { INavigationItemConfig, MainNav } from './mainnav.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'main-nav',
  template: `
    <ul class="navbar-nav">
      <li *ngFor="let item of navigation | permission"
          [ngClass]="{
        'nav-divider': item.divider,
        'nav-item': !item.divider,
        'nav-dropdown': item.children && item.children.length,
        'open': item.areaName && expandedArea == item.areaName }"
          routerLinkActive="active">
        <a *ngIf="item.url" [routerLink]="item.url" class="nav-link">
          <i *ngIf="item.icon" [class]="item.icon"></i>
          <span class="nav-link-text">{{item.text | translate}}</span>
        </a>
        <a *ngIf="item.children" (click)="toggleSubMenu(item.areaName)" class="nav-link has-ul">
          <i *ngIf="item.icon" [class]="item.icon"></i>
          <span class="nav-link-text">{{item.text | translate}}</span>
        </a>
        <ul class="nav-dropdown-items" *ngIf="item.children && item.children.length">
          <li class="nav-item" routerLinkActive="active" *ngFor="let subItem of item.children | permission">
            <a [routerLink]="subItem.url" class="nav-link">
              <i *ngIf="subItem.icon" [class]="subItem.icon"></i>
              <span class="nav-link-text">{{subItem.text | translate}}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  `,
  host: {
    'id': 'main-nav',
    'class': 'navbar-inverse',
    '[class.collapsed]': 'collapsed'
  }
})
export class MainNavComponent {
  expandedArea: string;
  collapsed: boolean = false;

  navigation: INavigationItemConfig[];

  /**
   * CTOR
   */
  constructor(navService: MainNav, private router: Router) {
    DispatcherService.subscribe(MAIN_MENU_TOGGLE, () => {
      this.collapsed = !this.collapsed;
    });
    this.navigation = navService.navigation;
    this.router.events.subscribe(this._routeChanged());
  }

  /**
   * Toggle sub-menu
   * @param area
   */
  toggleSubMenu(area: string) {
    if (this.expandedArea === area) {
      this.expandedArea = null;
    } else {
      this.expandedArea = area;
    }
  }

  private _routeChanged() {
    let self = this;

    return (event: any) => {
      if (event instanceof NavigationStart) { // TODO: Make this generic
        if (event.url.indexOf('/games') === 0) {
          self.expandedArea = 'GAMES';
          return;
        }
        if (event.url.indexOf('/currencies') === 0 ||
          event.url.indexOf('/permissions') === 0) {
          self.expandedArea = 'CONFIGURATION';
          return;
        }
      }
    };
  }
}
