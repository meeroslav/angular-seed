import { Injectable } from '@angular/core';
export interface INavigationConfig {
  [index: number]: INavigationItemConfig;
}
export interface INavigationItemConfig {
  icon?: string;
  text: string;
  url?: string | string[];
  areaName?: string;
  children?: INavigationItemConfig[];
  divider?: boolean;
}
@Injectable()
export class MainNav {
  navigation: INavigationConfig = [
    {
      text: 'Home',
      icon: 'app-icon-server',
      url: '/home'
    },
    {
      text: 'Components',
      icon: 'app-icon-distribution',
      areaName: 'PARK',
      children: [
        {
          text: 'Buttons',
          icon: 'app-icon-list',
          url: '/buttons'
        },
        {
          text: 'Forms',
          icon: 'app-icon-list',
          url: '/forms'
        },
        {
          text: 'Cards',
          icon: 'app-icon-list',
          url: '/cards'
        },
        {
          text: 'Data grids',
          icon: 'app-icon-list',
          url: '/table'
        },
        {
          text: 'Data lists',
          icon: 'app-icon-list',
          url: '/data-list'
        },
        {
          text: 'Miscellaneous',
          icon: 'app-icon-list',
          url: '/misc'
        }
      ]
    },
    {
      text: 'Colors and typefaces',
      icon: 'app-icon-edit',
      url: '/colors'
    }
  ];
}
