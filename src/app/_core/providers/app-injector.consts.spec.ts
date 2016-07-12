import { appInjector } from './app-injector.const';
import { provide, Injector } from '@angular/core';
import { addProviders } from '@angular/core/testing';

class InjectorMock {
    counter: number;

    get() {
        // ..
    }
}

describe('AppInjector: ', () => {

    beforeEach(() => {
        addProviders([
            provide(Injector, { useClass: InjectorMock })
        ]);
    });

    it('should save Injector as constant', () => {
        let injector = new InjectorMock();
        injector.counter = 5;
        let instance = appInjector(injector);
        expect(instance).toEqual(injector);
    });

    it('should keep the instance of Injector cached', () => {
        let injector = new InjectorMock();
        injector.counter = 5;
        appInjector(injector);

        let instance = appInjector();
        expect(instance).toEqual(injector);
    });
});
