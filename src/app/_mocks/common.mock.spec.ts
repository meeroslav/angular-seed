import { Component, Directive, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

export class MockedFeedbackService {
  notify() { /**/
  }
}

export class MockedLoadingIndicatorService {
  done() { /**/
  }

  start() { /**/
  }
}

export class MockedPageService {
  events: Subject<any> = new Subject();

  setBreadcrumbs() { /**/
  }

  updateBreadcrumbs() { /** */
  }

  notify() { /**/
  }

  doneLoading() { /**/
  }

  startLoading() { /**/
  }

  navigateTo() { /**/
  }
}

export class MockedModalDialogService {
  openDialog() { /**/
  }
}

export class MockedRouter {
  events: Subject<any> = new Subject();

  createUrlTree() { /* */
  }

  navigate() { /**/
  }
}

export class MockedViewContainerRef {
}

export class MockedApi {
  get(): Observable<any> {
    return of(null);
  }

  post(): Observable<any> {
    return of(null);
  }

  put(): Observable<any> {
    return of(null);
  }

  delete(): Observable<any> {
    return of(null);
  }
}

export class MockedActivatedRoute {
  params: Observable<any> = of({});
  url: Observable<any[]> = of([]);
  snapshot = {
    params: null,
    url: null
  };
}

@Directive({ selector: '[infield-label]' })
export class MockedInfieldLabel {
  @Input('infield-label') placeholder: string;
  @Input('infield-static-text') staticText: string;
}

export class MockedErrorService {
  init(): MockedErrorService {
    return this;
  }

  handle(): MockedErrorService {
    return this;
  }

  notify() { /**/
  }
}

@Directive({ selector: '[tooltip]' })
export class MockedTooltip {
  @Input('tooltip') tooltip: string;
}

@Component({ selector: 'breadcrumb', template: '<ng-content></ng-content>' })
export class MockedBreadcrumb {
  @Input() pageTitle: string;
}
