import { BreadcrumbService } from './breadcrumb.service';
import {TestBed} from '@angular/core/testing';

describe('Breadcrumb.Service: ', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbService]
    });
  });

  it('should return empty breadcrumb list initially', () => {
    let service = new BreadcrumbService();

    expect(service.breadcrumbs.length).toEqual(0);
  });

  it('should return two breadcrumbData', () => {
    let service = new BreadcrumbService();

    service.setBreadcrumbs([
      {url: '1abc', icon: '1def', text: '1ghi'},
      {url: '2abc', icon: '2def', text: '2ghi'}
    ]);

    expect(service.breadcrumbs.length).toEqual(2);
    expect(service.breadcrumbs[1].text).toEqual('2ghi');
  });
});
