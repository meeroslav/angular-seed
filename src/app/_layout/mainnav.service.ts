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
      icon: 'theme-icon-list',
      url: '/home'
    },
    {
      text: 'Components',
      icon: 'theme-icon-list',
      areaName: 'PARK',
      children: [
        {
          text: 'Buttons',
          icon: 'theme-icon-list',
          url: '/buttons'
        },
        {
          text: 'Forms',
          icon: 'theme-icon-list',
          url: '/forms'
        },
        {
          text: 'Cards',
          icon: 'theme-icon-list',
          url: '/cards'
        },
        {
          text: 'Data grids',
          icon: 'theme-icon-list',
          url: '/table'
        },
        {
          text: 'Data lists',
          icon: 'theme-icon-list',
          url: '/data-list'
        },
        {
          text: 'Miscellaneous',
          icon: 'theme-icon-list',
          url: '/misc'
        }
      ]
    },
    {
      text: 'Graphics',
      icon: 'theme-icon-list',
      areaName: 'GRAPHICS',
      children: [
        {
          text: 'Colors',
          icon: 'theme-icon-list',
          url: '/colors'
        },
        {
          text: 'Typefaces and icons',
          icon: 'theme-icon-list',
          url: '/typefaces'
        }
      ]
    },
    {
      text: 'Layouts',
      icon: 'theme-icon-list',
      areaName: 'LAYOUTS',
      children: [
      ]
    }
  ];
}
