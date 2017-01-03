import { Component } from '@angular/core';
import { DispatcherService } from '../_common/dispatcher/dispatcher.service';
import { MAIN_MENU_TOGGLE } from './layout.interface';

@Component( {
  selector: 'main-nav',
  template: `
    <ul class="nav">
      <li class="nav-item" routerLinkActive="active">
        <a routerLink="/home" class="nav-link">
          <i class="app-icon-monster"></i>
          Home
        </a>
      </li>
      <li class="nav-item nav-dropdown" routerLinkActive="open active" [ngClass]="{ 'open': expandedArea == 'PARK'}">
        <a (click)="toggleSubMenu('PARK')" class="has-ul nav-link">
          <i class="app-icon-monster"></i>
          Component Park
        </a>
        <ul class="nav-dropdown-items">
          <li class="nav-item" routerLinkActive="active">
            <a routerLink="/buttons" class="nav-link">            
              <i class="app-icon-monster"></i>
              Buttons
            </a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a routerLink="/buttons" class="nav-link">            
              <i class="app-icon-monster"></i>
              Buttons
            </a>
          </li> 
          <li class="nav-item" routerLinkActive="active">
            <a routerLink="/buttons" class="nav-link">            
              <i class="app-icon-monster"></i>
              Buttons
            </a>
          </li> 
          <li class="nav-item" routerLinkActive="active">
            <a routerLink="/buttons" class="nav-link">            
              <i class="app-icon-monster"></i>
              Buttons
            </a>
          </li>                                                 
        </ul>
      </li>
      <li class="nav-divider"></li>        
      <li class="nav-item" routerLinkActive="active">
        <a [routerLink]="['/bla']" class="nav-link">
          <i class="app-icon-monster"></i>
          Some else
        </a>
      </li>                
    </ul>
  `,
  host: {
    'id': 'main-nav',
    '[class.collapsed]': 'collapsed'
  }
})
export class MainNavComponent {
  expandedArea: string;
  collapsed: boolean = false;

  /**
   * CTOR
   */
  constructor() {
    DispatcherService.subscribe(MAIN_MENU_TOGGLE, () => {
       this.collapsed = !this.collapsed;
    });
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
}
