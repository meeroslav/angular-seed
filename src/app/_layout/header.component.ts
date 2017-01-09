import { Component } from '@angular/core';
import { DispatcherService } from '../_common/dispatcher/dispatcher.service';
import { MAIN_MENU_TOGGLE } from './layout.interface';

@Component( {
  selector: 'header',
  template: `
    <ul class="nav navbar-nav hidden-md-up">
      <li class="nav-item">
        <button class="nav-link navbar-toggler" type="button" (click)="toggleMainMenu()">☰</button>
      </li>
    </ul>    
    <a class="navbar-brand" [routerLink]="['.']">
      <i class="logo"></i>
      {{'APP_NAME' | translate}}
    </a>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav hidden-sm-down">
        <li class="nav-item">
          <button class="nav-link navbar-toggler" type="button" (click)="toggleMainMenu()">☰</button>
        </li>
      </ul>
      <form class="form-inline float-left hidden-sm-down">
         <input class="form-control" type="text" placeholder="Search..."/>
         <i class="app-icon-search"></i>
      </form>
    </div>
    <ul class="nav hidden-sm-down">
      <li class="nav-item float-right"><button class="app-icon-archive"></button></li>
      <li class="nav-item float-right"><button class="app-icon-notification"></button></li>
      <li class="nav-item float-right"><button class="app-icon-mail"></button></li>
    </ul>    
  `,
  host: {
    'class': 'navbar navbar-sticky-top navbar-inverse navbar-toggleable bg-inverse'
  }
})
export class HeaderComponent {

  toggleMainMenu() {
    DispatcherService.dispatch(MAIN_MENU_TOGGLE);
  }
}
