import { TestBed } from '@angular/core/testing';
import { DispatcherService } from './dispatcher.service';

describe('Dispatcher: ', () => {
    var fakeElement = {
        fakeMethod: () => { /** */ },
        fakeMethod1: () => { /** */ },
        fakeMethod2: () => { /** */ }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ DispatcherService]
        });
    });

    it('should trigger subscribed listener', () => {
        fakeElement.fakeMethod = () => { };
        spyOn(fakeElement, 'fakeMethod').and.callThrough();

        DispatcherService.subscribe('subscribedEvent', fakeElement.fakeMethod);
        DispatcherService.dispatch('subscribedEvent', 3, 4);

        expect(fakeElement.fakeMethod).toHaveBeenCalledWith(3, 4);
    });

    it('should trigger multiple listeners', () => {
        fakeElement.fakeMethod1 = () => { };
        fakeElement.fakeMethod2 = () => { };
        spyOn(fakeElement, 'fakeMethod1').and.callThrough();
        spyOn(fakeElement, 'fakeMethod2').and.callThrough();

        DispatcherService.subscribe('subscribedEventMultiple', fakeElement.fakeMethod1);
        DispatcherService.subscribe('subscribedEventMultiple', fakeElement.fakeMethod2);
        DispatcherService.dispatch('subscribedEventMultiple', 'ABC');

        expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
        expect(fakeElement.fakeMethod2).toHaveBeenCalledWith('ABC');
    });

    it('should not trigger listeners for unknown event', () => {
        fakeElement.fakeMethod = () => { };
        spyOn(fakeElement, 'fakeMethod').and.callThrough();

        DispatcherService.subscribe('knownEvent', fakeElement.fakeMethod);
        DispatcherService.dispatch('unknownEvent', 3, 4);

        expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
    });

    it('should not trigger listeners after it unsubscribed', () => {
        fakeElement.fakeMethod = () => { };
        spyOn(fakeElement, 'fakeMethod').and.callThrough();

        DispatcherService.subscribe('unsubscribedEvent', fakeElement.fakeMethod);
        DispatcherService.unsubscribe('unsubscribedEvent', fakeElement.fakeMethod);
        DispatcherService.dispatch('unsubscribedEvent', 'ABC');

        expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
    });

    it('should not trigger listeners if event is fully unsubscribed', () => {
        fakeElement.fakeMethod = () => { };
        spyOn(fakeElement, 'fakeMethod').and.callThrough();

        DispatcherService.subscribe('fullyUnsubscribedEvent', fakeElement.fakeMethod);
        DispatcherService.unsubscribe('fullyUnsubscribedEvent');
        DispatcherService.dispatch('fullyUnsubscribedEvent', 'ABC');

        expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
    });

    it('should trigger listeners if wrong listener function provided to unsubscribe', () => {
        fakeElement.fakeMethod1 = () => { };
        fakeElement.fakeMethod2 = () => { };
        spyOn(fakeElement, 'fakeMethod1').and.callThrough();
        spyOn(fakeElement, 'fakeMethod2').and.callThrough();

        DispatcherService.subscribe('someEvent', fakeElement.fakeMethod1);
        DispatcherService.unsubscribe('someEvent', fakeElement.fakeMethod2);
        DispatcherService.dispatch('someEvent', 'ABC');

        expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
        expect(fakeElement.fakeMethod2).not.toHaveBeenCalledWith('ABC');
    });

    it('should trigger listeners that were not unsubscribed', () => {
        fakeElement.fakeMethod1 = () => { };
        fakeElement.fakeMethod2 = () => { };
        spyOn(fakeElement, 'fakeMethod1').and.callThrough();
        spyOn(fakeElement, 'fakeMethod2').and.callThrough();

        DispatcherService.subscribe('someEvent', fakeElement.fakeMethod1);
        DispatcherService.subscribe('someEvent', fakeElement.fakeMethod2);
        DispatcherService.unsubscribe('someEvent', fakeElement.fakeMethod2);
        DispatcherService.dispatch('someEvent', 'ABC');

        expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
        expect(fakeElement.fakeMethod2).not.toHaveBeenCalledWith('ABC');
    });

    it('should cleanup all subscriptions', () => {
        fakeElement.fakeMethod1 = () => { };
        fakeElement.fakeMethod2 = () => { };
        spyOn(fakeElement, 'fakeMethod1').and.callThrough();
        spyOn(fakeElement, 'fakeMethod2').and.callThrough();

        DispatcherService.subscribe('someEvent', fakeElement.fakeMethod1);
        DispatcherService.subscribe('someEvent', fakeElement.fakeMethod2);
        DispatcherService.unsubscribe('someEvent', fakeElement.fakeMethod1);
        DispatcherService.unsubscribe('someEvent', fakeElement.fakeMethod2);
        DispatcherService.dispatch('someEvent', 'ABC');

        expect(fakeElement.fakeMethod1).not.toHaveBeenCalledWith('ABC');
        expect(fakeElement.fakeMethod2).not.toHaveBeenCalledWith('ABC');
    });
});
