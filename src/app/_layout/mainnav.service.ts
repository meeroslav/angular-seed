import {Injectable} from '@angular/core';
import * as R from 'ramda';

export interface INavigationItemConfig {
  icon?: string;
  text: string;
  url?: string | string[];
  areaName?: string;
  claims?: string | string[];
  children?: INavigationItemConfig[];
  divider?: boolean;
}

@Injectable()
export class MainNav {
  navigation: INavigationItemConfig[];

  private _navigation: INavigationItemConfig[] = [
    {
      text: 'navigation.DATA_CENTERS',
      icon: 'app-icon-data-center',
      url: '/data-centers',
      claims: 'ViewDataCenters'
    },
    // {
    //  text: 'navigation.GAMES',
    //  icon: 'app-icon-game',
    //  areaName: 'GAMES',
    //  children: [
        {
          text: 'navigation.GAMES',
          icon: 'app-icon-game',
          url: '/games/dashboard',
          claims: 'GamesDashboard'
        },
        {
          text: 'navigation.GAME_TITLES',
          icon: 'app-icon-tag',
          url: '/games/titles',
          claims: 'ViewGameTitleDashboard'
        },
        {
          text: 'navigation.GAME_PARTNERS',
          icon: 'app-icon-partner',
          url: '/games/game-partners',
          claims: 'ViewGamePartners'
        // }
    //  ]
    },
    {
      text: 'navigation.SITES',
      icon: 'app-icon-site',
      url: '/sites',
      claims: 'ManageSites'
    },
    {
      text: 'navigation.TEST_PARTNERS',
      icon: 'app-icon-test-partners',
      url: '/test-partners',
      claims: 'ViewTestPartners'
    },
    {
      text: 'navigation.CONFIGURATION',
      icon: 'app-icon-gears',
      areaName: 'CONFIGURATION',
      children: [
        {
          text: 'navigation.CURRENCIES',
          icon: 'app-icon-currencies',
          url: '/currencies',
          claims: 'ManageCurrencies'
        },
        {
          text: 'navigation.GAME_CATEGORIES',
          icon: 'app-icon-tree',
          url: '/game-categories',
          claims: 'ViewGameCategories'
        },
        {
          text: 'navigation.PERMISSIONS',
          icon: 'app-icon-brand',
          url: '/permissions',
          claims: 'ManageClaims'
        },
        {
          text: 'navigation.COUNTRIES',
          icon: 'app-icon-countries',
          url: '/countries',
          claims: 'ViewCountries'
        }
      ]
    }
  ];

  constructor() {
    this._navigation.forEach((itemConfig: INavigationItemConfig) => {
      if (!itemConfig.children) {
        return;
      }
      const childrenClaims = <string[]> R.flatten(R.map((config: INavigationItemConfig) => config.claims, itemConfig.children));

      // if at least one child does not have claims then the parent should NOT have any claims (should be visible)
      if (R.any((x => !x), childrenClaims)) {
        return;
      }

      itemConfig.claims = <string[]> R.flatten([itemConfig.claims || []]);
      itemConfig.claims = R.union(itemConfig.claims, childrenClaims);
    });

    this.navigation = this._navigation;
  }
}
