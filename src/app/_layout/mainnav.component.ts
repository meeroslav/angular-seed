import { Component, Input } from '@angular/core';
import { DispatcherService } from '../_common/dispatcher/dispatcher.service';
import { MAIN_MENU_TOGGLE } from './layout.interface';

@Component( {
  selector: 'main-nav',
  template: `
    <div class="sidebar-content">
      <ul class="nav navigation navigation-main">
        <li class="nav-item" routerLinkActive="active">
          <a routerLink="/home">
            <i class="app-icon-monster"></i>
            Home
          </a>
        </li>
        <li class="nav-item nav-dropdown" routerLinkActive="open active" [ngClass]="{ 'open': expandedArea == 'PARK'}">
          <a (click)="toggleSubMenu('PARK')" class="has-ul">
            <i class="app-icon-monster"></i>
            Component Park
          </a>
          <ul class="nav-dropdown-items">
            <li class="nav-item" routerLinkActive="active">
              <a routerLink="/buttons">            
                <i class="app-icon-monster"></i>
                Buttons
              </a>
            </li>
            <li class="nav-item" routerLinkActive="active">
              <a routerLink="/buttons">            
                <i class="app-icon-monster"></i>
                Buttons
              </a>
            </li> 
            <li class="nav-item" routerLinkActive="active">
              <a routerLink="/buttons">            
                <i class="app-icon-monster"></i>
                Buttons
              </a>
            </li> 
            <li class="nav-item" routerLinkActive="active">
              <a routerLink="/buttons">            
                <i class="app-icon-monster"></i>
                Buttons
              </a>
            </li>                                                 
          </ul>
        </li>
        <li class="divider"></li>        
        <li class="nav-item">
          <a [routerLink]="['/bla']" routerLinkActive="active">
            <i class="app-icon-monster"></i>
            Some else
          </a>
        </li>                
      </ul>
    </div>  
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
