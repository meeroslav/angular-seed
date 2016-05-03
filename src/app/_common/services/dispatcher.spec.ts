import '../../app.mocks.spec';
import {IDispatcher} from './dispatcher';

describe('Test: ', () => {
	var service: IDispatcher;
	var fakeElement = {
		fakeMethod: () => { },
		fakeMethod1: () => { },
		fakeMethod2: () => { },
	};
	
	beforeEach(inject(
		(Dispatcher: IDispatcher) => {
			service = Dispatcher;
		}
	));
	
	it('should trigger subscribed listener', () => {
		fakeElement.fakeMethod = () => { };
		spyOn(fakeElement, 'fakeMethod').and.callThrough();

		service.subscribe('someEvent', fakeElement.fakeMethod);
		service.dispatch('someEvent', 3, 4);

		expect(fakeElement.fakeMethod).toHaveBeenCalledWith(3, 4);
	});
	
	it('should trigger multiple listeners', () => {
		fakeElement.fakeMethod1 = () => { };
		fakeElement.fakeMethod2 = () => { };
		spyOn(fakeElement, 'fakeMethod1').and.callThrough();
		spyOn(fakeElement, 'fakeMethod2').and.callThrough();

		service.subscribe('someEvent', fakeElement.fakeMethod1);
		service.subscribe('someEvent', fakeElement.fakeMethod2);
		service.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
		expect(fakeElement.fakeMethod2).toHaveBeenCalledWith('ABC');
	});

	it('should not trigger listeners for unknown event', () => {
		fakeElement.fakeMethod = () => { };
		spyOn(fakeElement, 'fakeMethod').and.callThrough();

		service.subscribe('someEvent', fakeElement.fakeMethod);
		service.dispatch('', 3, 4);

		expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
	});

	it('should not trigger listeners after it unsubscribed', () => {
		fakeElement.fakeMethod = () => { };
		spyOn(fakeElement, 'fakeMethod').and.callThrough();

		service.subscribe('someEvent', fakeElement.fakeMethod);
		service.unsubscribe('someEvent', fakeElement.fakeMethod);
		service.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
	});

	it('should not trigger listeners if event is fully unsubscribed', () => {
		fakeElement.fakeMethod = () => { };
		spyOn(fakeElement, 'fakeMethod').and.callThrough();

		service.subscribe('someEvent', fakeElement.fakeMethod);
		service.unsubscribe('someEvent');
		service.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
	});

	it('should trigger listeners if wrong listener function provided', () => {
		fakeElement.fakeMethod1 = () => { };
		fakeElement.fakeMethod2 = () => { };
		spyOn(fakeElement, 'fakeMethod1').and.callThrough();
		spyOn(fakeElement, 'fakeMethod2').and.callThrough();

		service.subscribe('someEvent', fakeElement.fakeMethod1);
		service.unsubscribe('someEvent', fakeElement.fakeMethod2);
		service.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
		expect(fakeElement.fakeMethod2).not.toHaveBeenCalledWith('ABC');
	});

	it('should trigger listeners that were not unsubscribed', () => {
		fakeElement.fakeMethod1 = () => { };
		fakeElement.fakeMethod2 = () => { };
		spyOn(fakeElement, 'fakeMethod1').and.callThrough();
		spyOn(fakeElement, 'fakeMethod2').and.callThrough();

		service.subscribe('someEvent', fakeElement.fakeMethod1);
		service.subscribe('someEvent', fakeElement.fakeMethod2);
		service.unsubscribe('someEvent', fakeElement.fakeMethod2);
		service.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
		expect(fakeElement.fakeMethod2).not.toHaveBeenCalledWith('ABC');
	});
});