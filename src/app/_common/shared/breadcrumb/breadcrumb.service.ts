import { Injectable } from '@angular/core';

export interface IBreadcrumb {
  url?: string;
  icon: string;
  text: string;
}

@Injectable()
export class BreadcrumbService {
  breadcrumbs: IBreadcrumb[];

  /**
   * CTOR
   */
  constructor() {
    this.breadcrumbs = [];
  }

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
