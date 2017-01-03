import { Component, Input } from '@angular/core';
import { DispatcherService } from '../_common/dispatcher/dispatcher.service';
import { MAIN_MENU_TOGGLE } from './layout.interface';

@Component( {
  selector: 'main-nav',
  template: `
    <div class="sidebar-content">
      <ul class="nav navigation navigation-main navigation-accordion">
        <li class="nav-item">
          <a [routerLink]="['/home']"><span>Home</span></a>
        </li>
        <li class="nav-item nav-dropdown">
          <a (click)="toggleSubMenu('ABC')" class="has-ul"><span>Some text</span></a>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <a href="#" class="has-ul"><span>Some text</span></a>
            </li>            
          </ul>
        </li>
        <li class="divider"></li>        
        <li class="nav-item">
          <a [routerLink]="['/buttons']"><span>Buttons</span></a>
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
  @Input() expandedArea: string;
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
