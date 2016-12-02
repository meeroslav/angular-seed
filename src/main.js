/// <reference path="../../typings/browser.d.ts" />
System.register(['@angular/platform-browser-dynamic', '@angular/core', '@angular/http', '@angular/forms', './app.component', './_core/providers/exception-logger.service', './_core/providers/app-config.provider', './_core/providers/app-injector.const', './app.routes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, core_1, http_1, forms_1, app_component_1, exception_logger_service_1, app_config_provider_1, app_injector_const_1, app_routes_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (exception_logger_service_1_1) {
                exception_logger_service_1 = exception_logger_service_1_1;
            },
            function (app_config_provider_1_1) {
                app_config_provider_1 = app_config_provider_1_1;
            },
            function (app_injector_const_1_1) {
                app_injector_const_1 = app_injector_const_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            }],
        execute: function() {
            // set ng app in prod mode
            if (!window['development_mode']) {
                core_1.enableProdMode();
            }
            // bootstrap
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
                app_routes_1.APP_ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                app_config_provider_1.AppConfig,
                core_1.provide(core_1.ExceptionHandler, { useClass: exception_logger_service_1.ExceptionLogger }),
                core_1.provide(core_1.APP_INITIALIZER, { useFactory: function (config) { return function () { return config.load(); }; }, deps: [app_config_provider_1.AppConfig, http_1.HTTP_PROVIDERS], multi: true }),
                forms_1.disableDeprecatedForms(),
                forms_1.provideForms()
            ]).then(function (componentRef) {
                // initialize static injector
                app_injector_const_1.appInjector(componentRef.injector);
            });
        }
    }
});

//# sourceMappingURL=main.js.map
