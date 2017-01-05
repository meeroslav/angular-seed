import { TestBed } from '@angular/core/testing';
import {SelectionDispatcher} from './selection-dispatcher.service';

describe('SelectionDispatcher: ', () => {
  var fakeElement = {
    fakeMethod1: () => { /** */
    },
    fakeMethod2: () => { /** */
    }
  };

  var service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectionDispatcher]
    });

    service = new SelectionDispatcher();
  });

  it('should notify all listeners', () => {
    spyOn(fakeElement, 'fakeMethod1').and.callThrough();
    spyOn(fakeElement, 'fakeMethod2').and.callThrough();

    service.listen(fakeElement.fakeMethod1);
    service.listen(fakeElement.fakeMethod2);

    service.notify('123', 'ABC');

    expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('123', 'ABC');
    expect(fakeElement.fakeMethod2).toHaveBeenCalledWith('123', 'ABC');
  });

});