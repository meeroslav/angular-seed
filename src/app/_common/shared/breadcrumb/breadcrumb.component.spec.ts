import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService, IBreadcrumb } from './breadcrumb.service';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockedTranslatePipe } from '../../../_mocks/translate.mock.spec';
import { By } from '@angular/platform-browser';
import { MockedRouter } from '../../../_mocks/common.mock.spec';
import { MockedRouterLink } from '../../../_mocks/router.mock.spec';

class MockedBreadcrumbService {
  breadcrumbs: IBreadcrumb[] = [];

  setBreadcrumbs(crumbs: IBreadcrumb[]) {
    this.breadcrumbs = crumbs;
  }
}

describe('Breadcrumb.Component ', () => {
  let fixture, router, service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent, MockedTranslatePipe, MockedRouterLink],
      providers: [
        { provide: BreadcrumbService, useClass: MockedBreadcrumbService },
        { provide: Router, useClass: MockedRouter }
      ]
    });

    fixture = TestBed.createComponent(BreadcrumbComponent);
    router = fixture.debugElement.injector.get(Router);
    service = fixture.debugElement.injector.get(BreadcrumbService);
  });

  it('should initialize component', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should not have breadcrumbs if service empty', () => {
    fixture.detectChanges();

    let wrapper = fixture.debugElement.query(By.css('ol.breadcrumb'));
    expect(wrapper).toBeNull();
  });

  it('should have breadcrumbData if defined in service and set class by icon name', () => {
    let crumbs = [
      { url: '1abc', icon: '1def', text: '1ghi' },
      { url: '2abc', icon: '2def', text: '2ghi' }
    ];
    service.setBreadcrumbs(crumbs);
    fixture.detectChanges();

    let wrapper = fixture.debugElement.query(By.css('ol.breadcrumb'));
    let breadcrumbs = wrapper.children;
    expect(breadcrumbs.length).toEqual(2);

    expect(breadcrumbs[0].nativeElement.className).toMatch(/breadcrumb-item/);
    expect(breadcrumbs[0].nativeElement.firstElementChild.className).toMatch(/1def/);
    expect(breadcrumbs[1].nativeElement.className).toMatch(/breadcrumb-item/);
    expect(breadcrumbs[1].nativeElement.firstElementChild.className).toMatch(/2def/);
  });

});
