import { Component } from '@angular/core';
import { DispatcherService } from '../_common/dispatcher/dispatcher.service';
import { MAIN_MENU_TOGGLE } from './layout.interface';

@Component( {
  selector: 'header',
  template: `
  <div class="container-fluid">
    <button class="navbar-toggler mobile-toggler hidden-lg-up" type="button" (click)="toggleMainMenu()">☰</button>
    <a class="navbar-brand" [routerLink]="['.']">
      <i class="logo"></i>
      {{'APP_NAME' | translate}}
    </a>
    <ul class="nav navbar-nav hidden-md-down float-xs-left">
      <li class="nav-item">
        <button class="nav-link navbar-toggler layout-toggler" type="button" (click)="toggleMainMenu()">☰</button>
      </li>
    </ul>
    <form class="form-inline float-xs-left hidden-md-down">
       <input class="form-control" type="text" placeholder="Search..."/>
    </form>
    <ul class="nav navbar-nav float-xs-right">
      <li class="nav-item hidden-md-down"><button class="app-icon-search"></button></li>
      <li class="nav-item hidden-md-down"><button class="app-icon-notification"></button></li>
      <li class="nav-item hidden-md-down"><button class="app-icon-mail"></button></li>
    </ul>
  </div>
  `,
  host: {
    'class': 'navbar navbar-sticky-top navbar-inverse'
  }
})
export class HeaderComponent {

  toggleMainMenu() {
    DispatcherService.dispatch(MAIN_MENU_TOGGLE);
  }
}
