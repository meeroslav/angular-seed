import { beforeEachProviders, beforeEach, inject } from '@angular/core/testing';
import { HTTP_PROVIDERS, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { provide } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppConfig } from './app-config.provider';

describe('AppConfig.Provider: ', () => {
    let provider, mockedConfig;
    let environment;

    beforeEachProviders(() => [
        HTTP_PROVIDERS,
        provide(XHRBackend, {useClass: MockBackend}),
        AppConfig
    ]);

    function initMockedConfig() {
        mockedConfig = {
            languages: {}
        };
    }

    beforeEach(inject([XHRBackend, AppConfig], (xhrBackend: any, appConfig: AppConfig) => {
        provider = appConfig;
        initMockedConfig();
        environment = window['development_mode'];
        window['development_mode'] = true;
        xhrBackend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: mockedConfig
                    })
                ));
            });
    }));

    afterEach(() => {
        window['development_mode'] = environment;
    });

    it('should initialize appConfig service', () => {
        expect(provider.load).toBeDefined();
    });

    it('should throw exception if unknown environment', () => {
        // provider.load().then(() => {
        //     expect(provider.data).toBeDefined();
        // });
    });

    it('should throw exception if environment has no order', () => {
        // provider.load().then(() => {
        //     expect(provider.data).toBeDefined();
        // });
    });

    it('should get configuration for dev and save data', () => {
        provider.load();
        expect(provider.data).toEqual(mockedConfig);
    });

    it('should merge configurations for dev and prod', () => {
        mockedConfig.datacenters = {
            prod: { uniqueProd: 'prod', joined: 'prodJoin'},
            dev: { joined: 'devJoin' }
        };
        provider.load();
        expect(provider.data.datacenters.uniqueProd).toEqual('prod');
        expect(provider.data.datacenters.joined).toEqual('devJoin');
    });

    it('should use just prod configurations if prod environment', () => {
        window['development_mode'] = false;
        mockedConfig.datacenters = {
            prod: { uniqueProd: 'prod', joined: 'prodJoin'},
            dev: { joined: 'devJoin' }
        };
        provider.load();
        expect(provider.data.datacenters.uniqueProd).toEqual('prod');
        expect(provider.data.datacenters.joined).toEqual('prodJoin');
    });

});
