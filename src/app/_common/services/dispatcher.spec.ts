import 'reflect-metadata';
import {inject, beforeEachProviders} from '@angular/core/testing';
import Dispatcher from './dispatcher';

describe('Test: ', () => {
	var fakeElement = {
		fakeMethod: () => { },
		fakeMethod1: () => { },
		fakeMethod2: () => { },
	};
	
	beforeEachProviders(() => [
		Dispatcher
	]);
	
	it('should trigger subscribed listener', () => {
		fakeElement.fakeMethod = () => { };
		spyOn(fakeElement, 'fakeMethod').and.callThrough();

		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod);
		Dispatcher.dispatch('someEvent', 3, 4);

		expect(fakeElement.fakeMethod).toHaveBeenCalledWith(3, 4);
	});
	
	it('should trigger multiple listeners', () => {
		fakeElement.fakeMethod1 = () => { };
		fakeElement.fakeMethod2 = () => { };
		spyOn(fakeElement, 'fakeMethod1').and.callThrough();
		spyOn(fakeElement, 'fakeMethod2').and.callThrough();

		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod1);
		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod2);
		Dispatcher.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
		expect(fakeElement.fakeMethod2).toHaveBeenCalledWith('ABC');
	});

	it('should not trigger listeners for unknown event', () => {
		fakeElement.fakeMethod = () => { };
		spyOn(fakeElement, 'fakeMethod').and.callThrough();

		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod);
		Dispatcher.dispatch('', 3, 4);

		expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
	});

	it('should not trigger listeners after it unsubscribed', () => {
		fakeElement.fakeMethod = () => { };
		spyOn(fakeElement, 'fakeMethod').and.callThrough();

		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod);
		Dispatcher.unsubscribe('someEvent', fakeElement.fakeMethod);
		Dispatcher.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
	});

	it('should not trigger listeners if event is fully unsubscribed', () => {
		fakeElement.fakeMethod = () => { };
		spyOn(fakeElement, 'fakeMethod').and.callThrough();

		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod);
		Dispatcher.unsubscribe('someEvent');
		Dispatcher.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod).not.toHaveBeenCalled();
	});

	it('should trigger listeners if wrong listener function provided', () => {
		fakeElement.fakeMethod1 = () => { };
		fakeElement.fakeMethod2 = () => { };
		spyOn(fakeElement, 'fakeMethod1').and.callThrough();
		spyOn(fakeElement, 'fakeMethod2').and.callThrough();

		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod1);
		Dispatcher.unsubscribe('someEvent', fakeElement.fakeMethod2);
		Dispatcher.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
		expect(fakeElement.fakeMethod2).not.toHaveBeenCalledWith('ABC');
	});

	it('should trigger listeners that were not unsubscribed', () => {
		fakeElement.fakeMethod1 = () => { };
		fakeElement.fakeMethod2 = () => { };
		spyOn(fakeElement, 'fakeMethod1').and.callThrough();
		spyOn(fakeElement, 'fakeMethod2').and.callThrough();

		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod1);
		Dispatcher.subscribe('someEvent', fakeElement.fakeMethod2);
		Dispatcher.unsubscribe('someEvent', fakeElement.fakeMethod2);
		Dispatcher.dispatch('someEvent', 'ABC');

		expect(fakeElement.fakeMethod1).toHaveBeenCalledWith('ABC');
		expect(fakeElement.fakeMethod2).not.toHaveBeenCalledWith('ABC');
	});
});
