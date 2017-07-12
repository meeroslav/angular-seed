import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, git rebase --cRouterState } from '@angular/router';
// import * as R from 'ramda';

export interface IBreadcrumb {
  url?: string;
  icon: string;
  text: string;
}

// function extractBreadcrumbs(snapshot: ActivatedRouteSnapshot) {
//
//   let children = snapshot.children.length ? R.flatten(snapshot.children.map(extractBreadcrumbs)) : [];
//
//   if (snapshot.data.breadcrumb) {
//     // extend it by url
//     return [snapshot.data.breadcrumb, ...children];
//   }
//   return children;
// }

@Injectable()
export class BreadcrumbService {
  breadcrumbs: IBreadcrumb[];

  /**
   * CTOR
   */
  constructor() {
    this.breadcrumbs = [];
  }

  // extractFromRoute(state: RouterState) {
  //   console.log(extractBreadcrumbs(state.root.snapshot));
  //   extractBreadcrumbs(state.root.snapshot);
  //   console.log(state);
  //   console.log(serializeNodes(state['_root']));
  // }

  /**
   * Set breadcrumbs
   * @param breadcrumbs
   */
  setBreadcrumbs(breadcrumbs?: IBreadcrumb[]) {
    this.breadcrumbs = breadcrumbs || [];
  }

  /**
   * Append breadcrumbs
   * @param breadcrumbs
   */
  appendBreadcrumbs(breadcrumbs: IBreadcrumb[]) {
    if (breadcrumbs && breadcrumbs.length) {
      Array.prototype.push.apply(this.breadcrumbs, breadcrumbs);
    }
  }
}
