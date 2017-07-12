import { Subject } from 'rxjs/Subject';
import { Directive, Input } from '@angular/core';

export class MockedRouter {
  events: Subject<any> = new Subject();
  createUrlTree() { /* */ }
  navigate() { /**/ }
}

@Directive({
  selector: '[routerLink]'
})
export class MockedRouterLink {
  @Input()
  set routerLink(claims: string | string[]) { }
}
