export interface INavigationItemConfig {
  icon?: string;
  text: string;
  url?: string | string[];
  areaName?: string;
  claims?: string | string[];
  children?: INavigationItemConfig[];
  divider?: boolean;
}

export let NAVIGATION_DATA: INavigationItemConfig[] = [
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
    children: []
  }
];
