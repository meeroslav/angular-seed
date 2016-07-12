import {Injector} from '@angular/core';

/**
 * Creates constant Injector instance function for easy class extension
 * without the need for parent's dependency tree
 * @param injector
 */
let appInjectorRef: Injector;
export const appInjector = (injector?: Injector): Injector => {
    if (injector) {
        appInjectorRef = injector;
    }
    return appInjectorRef;
};
