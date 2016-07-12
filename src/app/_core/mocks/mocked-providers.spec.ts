/******************************************************************************
 *                                APP CONFIG MOCK
******************************************************************************/

import { Injectable, provide } from '@angular/core';
import { IAppConfig } from '../providers/app-config.provider';

class MockedAppConfig {
    data: IAppConfig;

    // set default basic data for API
    constructor() {
        this.data = {
            languages: {
                languages: [],
                default: 'en'
            }
        };
    }

    load() {
        // do nothing
    }
}

/******************************************************************************
 *                                PROVIDERS' MOCKS
******************************************************************************/

import { addProviders } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterOutletMap } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';
import { Pipe, PipeTransform } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import { AppConfig } from '../providers/app-config.provider';

class MockRouter { createUrlTree() { /* */ } }
class MockActivatedRoute { }
class MockRouterOutletMap { registerOutlet() { /* */ } }
class MockTranslateService { }
@Pipe({name: 'translate'})
class MockTranslatePipe implements PipeTransform  { transform(query) { return query; } }

@Injectable()
export class MockedProviders {
    // initialize providers
    static init(providers?: any[], mockedResponse?: any) {
        addProviders([
            // router
            provide(Router, { useClass: MockRouter }),
            provide(ActivatedRoute, { useClass: MockActivatedRoute }),
            provide(RouterOutletMap, { useClass: MockRouterOutletMap }),
            LocationStrategy,
            // translate
            provide(TranslateService, { useClass: MockTranslateService }),
            provide(TranslatePipe, { useClass: MockTranslatePipe }),
            // http
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            // app config
            provide(AppConfig, { useClass: MockedAppConfig}),
        ].concat(providers || []));
    }
}
