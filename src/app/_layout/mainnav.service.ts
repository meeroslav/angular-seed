import { Injectable } from '@angular/core';
import * as R from 'ramda';
import { INavigationItemConfig, NAVIGATION_DATA } from './mainnav';

@Injectable()
export class MainNav {
  navigation: INavigationItemConfig[];

  /**
   * Set claims from parent to child
   * @param itemConfig
   */
  private static copyClaimsToParent(itemConfig: INavigationItemConfig) {
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
  }

  /**
   * CTOR
   */
  constructor() {
    this.navigation = R.forEach(MainNav.copyClaimsToParent, NAVIGATION_DATA);
  }
}
