import { Component } from '@angular/core';
import { DispatcherService } from '../_common/dispatcher/dispatcher.service';
import { MAIN_MENU_TOGGLE } from './layout.interface';

@Component({
  selector: 'header',
  template: `
    <ul class="nav navbar-nav hidden-md-up">
      <li class="nav-item">
        <button class="nav-link navbar-toggler" type="button" (click)="toggleMainMenu()">☰</button>
      </li>
    </ul>
    <a class="navbar-brand" [routerLink]="['.']" title="{{'APP_NAME' | translate }}">
      <img class="logo" src="../../assets/images/logotype.svg" alt="{{'APP_NAME' | translate }}"/>
    </a>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav hidden-sm-down">
        <li class="nav-item">
          <button class="nav-link navbar-toggler" type="button" (click)="toggleMainMenu()">☰</button>
        </li>
      </ul>
      <!--<form class="form-inline hidden-sm-down search-form">-->
      <!--<label for="search" class="theme-icon-search search-icon"></label>-->
      <!--<input id="search" class="search-control" type="text" placeholder="Search..."/>-->
      <!--</form>-->
      <!--<info-dev></info-dev>-->
    </div>
    <ul class="nav hidden-sm-down">
      <!--<li class="nav-item float-right"><button class="theme-icon-notification"></button></li>-->
      <!--<li class="nav-item float-right"><button class="theme-icon-mail"></button></li>-->
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
