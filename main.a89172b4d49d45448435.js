webpackJsonp([11],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./buttons/buttons.module": [
		"./src/app/buttons/buttons.module.ts",
		9
	],
	"./cards/cards.module": [
		"./src/app/cards/cards.module.ts",
		8
	],
	"./colors/colors.module": [
		"./src/app/colors/colors.module.ts",
		7
	],
	"./data-list/data-list.module": [
		"./src/app/data-list/data-list.module.ts",
		6
	],
	"./forms/forms.module": [
		"./src/app/forms/forms.module.ts",
		0,
		1
	],
	"./home/home.module": [
		"./src/app/home/home.module.ts",
		0,
		5
	],
	"./miscellaneous/miscellaneous.module": [
		"./src/app/miscellaneous/miscellaneous.module.ts",
		0,
		3
	],
	"./table/table.module": [
		"./src/app/table/table.module.ts",
		2
	],
	"./typefaces/typefaces.module": [
		"./src/app/typefaces/typefaces.module.ts",
		4
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/_common/dispatcher/dispatcher.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DispatcherModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher_service__ = __webpack_require__("./src/app/_common/dispatcher/dispatcher.service.ts");


var DispatcherModule = (function () {
    function DispatcherModule() {
    }
    DispatcherModule_1 = DispatcherModule;
    DispatcherModule.forRoot = function () {
        return {
            ngModule: DispatcherModule_1,
            providers: [__WEBPACK_IMPORTED_MODULE_1__dispatcher_service__["a" /* DispatcherService */]]
        };
    };
    DispatcherModule = DispatcherModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [__WEBPACK_IMPORTED_MODULE_1__dispatcher_service__["a" /* DispatcherService */]]
        })
    ], DispatcherModule);
    return DispatcherModule;
    var DispatcherModule_1;
}());



/***/ }),

/***/ "./src/app/_common/dispatcher/dispatcher.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DispatcherService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var DispatcherService = (function () {
    function DispatcherService() {
    }
    DispatcherService_1 = DispatcherService;
    DispatcherService.dispatch = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!eventName || !DispatcherService_1.subscriptions[eventName] || !DispatcherService_1.subscriptions[eventName].length) {
            return;
        }
        for (var i = 0; i < DispatcherService_1.subscriptions[eventName].length; i = i + 1) {
            DispatcherService_1.subscriptions[eventName][i].apply(this, args);
        }
    };
    DispatcherService.subscribe = function (eventName, func) {
        if (!DispatcherService_1.subscriptions[eventName]) {
            DispatcherService_1.subscriptions[eventName] = [];
        }
        DispatcherService_1.subscriptions[eventName].push(func);
    };
    DispatcherService.unsubscribe = function (eventName, func) {
        if (!func) {
            DispatcherService_1.subscriptions[eventName] = null;
            return;
        }
        var index = DispatcherService_1.subscriptions[eventName].indexOf(func);
        if (index !== -1) {
            DispatcherService_1.subscriptions[eventName].splice(index, 1);
            if (!DispatcherService_1.subscriptions[eventName].length) {
                DispatcherService_1.subscriptions[eventName] = null;
            }
        }
    };
    DispatcherService.subscriptions = {};
    DispatcherService = DispatcherService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], DispatcherService);
    return DispatcherService;
    var DispatcherService_1;
}());



/***/ }),

/***/ "./src/app/_common/dispatcher/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dispatcher_module__ = __webpack_require__("./src/app/_common/dispatcher/dispatcher.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__dispatcher_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dispatcher_service__ = __webpack_require__("./src/app/_common/dispatcher/dispatcher.service.ts");
/* unused harmony namespace reexport */




/***/ }),

/***/ "./src/app/_common/shared/breadcrumb/breadcrumb.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("./src/app/_common/shared/breadcrumb/breadcrumb.service.ts");


var BreadcrumbComponent = (function () {
    function BreadcrumbComponent(service) {
        this.service = service;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], BreadcrumbComponent.prototype, "pageTitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], BreadcrumbComponent.prototype, "pageSubtitle", void 0);
    BreadcrumbComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'breadcrumb',
            template: "\n    <div class=\"page-header\">\n      <div class=\"page-header-info\">\n        <h1 *ngIf=\"pageTitle\">\n          {{ pageTitle | translate }}\n          <span class=\"ml-2 page-subtitle badge badge-success\" *ngIf=\"pageSubtitle\">{{ pageSubtitle | translate }}</span>\n        </h1>\n        <ol class=\"breadcrumb mb-0 mt-1\" *ngIf=\"service.breadcrumbs.length\">\n          <li *ngFor=\"let crumb of service.breadcrumbs\"\n              class=\"breadcrumb-item\" [ngClass]=\"{active: !crumb.url}\">\n            <a [class]=\"crumb.icon\" [routerLink]=\"crumb.url\" *ngIf=\"crumb.url\">{{crumb.text | translate}}</a>\n            <span [class]=\"crumb.icon\" *ngIf=\"!crumb.url\">{{crumb.text | translate}}</span>\n          </li>\n        </ol>\n      </div>\n      <div class=\"page-header-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            styles: ["\n    .breadcrumb-item [class^=\"app-icon-\"]:before, .breadcrumb-item [class*=\" app-icon-\"]:before,\n    .breadcrumb-item [class^=\"theme-icon-\"]:before, .breadcrumb-item [class*=\" theme-icon-\"]:before {\n      padding-right: .5rem;\n    }\n  "]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]])
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());



/***/ }),

/***/ "./src/app/_common/shared/breadcrumb/breadcrumb.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var BreadcrumbService = (function () {
    function BreadcrumbService() {
        this.breadcrumbs = [];
    }
    BreadcrumbService.prototype.setBreadcrumbs = function (breadcrumbs) {
        this.breadcrumbs = breadcrumbs || [];
    };
    BreadcrumbService.prototype.appendBreadcrumbs = function (breadcrumbs) {
        if (breadcrumbs && breadcrumbs.length) {
            Array.prototype.push.apply(this.breadcrumbs, breadcrumbs);
        }
    };
    BreadcrumbService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], BreadcrumbService);
    return BreadcrumbService;
}());



/***/ }),

/***/ "./src/app/_common/shared/error/403.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Error403Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var Error403Component = (function () {
    function Error403Component() {
        this.linkStart = '<a href="/">';
        this.linkEnd = '</a>';
    }
    Error403Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'error-403-component',
            styles: [__webpack_require__("./src/app/_common/shared/error/error.component.scss")],
            host: {
                'id': 'error-page'
            },
            template: "\n    <div id=\"error-logo\">\n        <span class=\"monster-layer\" *ngFor=\"let m of [1,2,3,4,5]\">\n            <span class=\"monster-eye\"></span>\n            <span class=\"theme-icon-close monster\"></span>\n        </span>\n    </div>\n    <h1 id=\"error-heading\">{{ 'error.403_ERROR_HEADING' | translate }}</h1>\n    <p>{{ 'error.403_ERROR_MESSAGE' | translate }}</p>\n    <span [innerHTML]=\"'error.RETURN_TO_PAGE' | translate:{linkStart: linkStart, linkEnd: linkEnd}\"></span>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], Error403Component);
    return Error403Component;
}());



/***/ }),

/***/ "./src/app/_common/shared/error/404.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Error404Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var Error404Component = (function () {
    function Error404Component() {
        this.linkStart = '<a href="/">';
        this.linkEnd = '</a>';
    }
    Error404Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'error-404-component',
            styles: [__webpack_require__("./src/app/_common/shared/error/error.component.scss")],
            host: {
                'id': 'error-page'
            },
            template: "\n    <div id=\"error-logo\">\n      <span class=\"monster-layer\" *ngFor=\"let m of [1,2,3,4,5]\">\n          <span class=\"monster-eye\"></span>\n          <span class=\"app-icon-monster monster\"></span>\n          <span class=\"monster-retina\"></span>\n      </span>\n    </div>\n    <h1 id=\"error-heading\">{{ 'error.404_ERROR_HEADING' | translate }}</h1>\n    <p>{{ 'error.404_ERROR_MESSAGE' | translate }}</p>\n    <span [innerHTML]=\"'error.GO_TO_PAGE' | translate:{linkStart: linkStart, linkEnd: linkEnd}\"></span>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], Error404Component);
    return Error404Component;
}());



/***/ }),

/***/ "./src/app/_common/shared/error/503.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Error503Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var Error503Component = (function () {
    function Error503Component() {
    }
    Error503Component = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'error-503-component',
            styles: [__webpack_require__("./src/app/_common/shared/error/error.component.scss")],
            host: {
                'id': 'error-page'
            },
            template: "\n    <div id=\"error-logo\">\n      <span class=\"monster-layer\" *ngFor=\"let m of [1,2,3,4,5]\">\n        <span class=\"monster-eye\"></span>\n        <span class=\"app-icon-game monster\"></span>\n        <span class=\"monster-retina\"></span>\n      </span>\n    </div>\n    <h1 id=\"error-heading\">{{ 'error.503_ERROR_HEADING' | translate }}</h1>\n    <p>{{ 'error.503_ERROR_MESSAGE' | translate}}</p>\n  "
        })
    ], Error503Component);
    return Error503Component;
}());



/***/ }),

/***/ "./src/app/_common/shared/error/error.component.scss":
/***/ (function(module, exports) {

module.exports = "@-webkit-keyframes spin {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n@-moz-keyframes spin {\n  0% {\n    -moz-transform: rotate(0deg); }\n  100% {\n    -moz-transform: rotate(360deg); } }\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-moz-keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@-moz-keyframes shakeCentral {\n  from, to {\n    transform: translate3d(0, -50%, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    transform: translate3d(-2rem, -50%, 0); }\n  20%, 40%, 60%, 80% {\n    transform: translate3d(2rem, -50%, 0); } }\n\n@-webkit-keyframes shakeCentral {\n  from, to {\n    transform: translate3d(0, -50%, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    transform: translate3d(-2rem, -50%, 0); }\n  20%, 40%, 60%, 80% {\n    transform: translate3d(2rem, -50%, 0); } }\n\n@keyframes shakeCentral {\n  from, to {\n    transform: translate3d(0, -50%, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    transform: translate3d(-2rem, -50%, 0); }\n  20%, 40%, 60%, 80% {\n    transform: translate3d(2rem, -50%, 0); } }\n\n@-webkit-keyframes scaleNotify {\n  from, to {\n    transform: scale(1, 1); }\n  20%, 60% {\n    transform: scale(0.8, 0.8); }\n  40%, 80% {\n    transform: scale(1.25, 1.25); } }\n\n@-moz-keyframes scaleNotify {\n  from, to {\n    transform: scale(1, 1); }\n  20%, 60% {\n    transform: scale(0.8, 0.8); }\n  40%, 80% {\n    transform: scale(1.25, 1.25); } }\n\n@keyframes scaleNotify {\n  from, to {\n    transform: scale(1, 1); }\n  20%, 60% {\n    transform: scale(0.8, 0.8); }\n  40%, 80% {\n    transform: scale(1.25, 1.25); } }\n\n/********************************\n    Custom theme values\n*********************************/\n/********************************************\n*********************************************\n          Override bootstrap values\n*********************************************\n*********************************************/\n@-moz-keyframes scalezoom {\n  0% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    transform: scale(1, 1); }\n  50% {\n    -webkit-transform: scale(1.5, 1.5);\n    -moz-transform: scale(1.5, 1.5);\n    transform: scale(1.5, 1.5); }\n  80% {\n    -webkit-transform: rotate(0.5);\n    -moz-transform: rotate(0.5);\n    transform: rotate(0.5); }\n  100% {\n    -webkit-transform: rotate(1);\n    -moz-transform: rotate(1);\n    transform: rotate(1); } }\n\n@-webkit-keyframes scalezoom {\n  0% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    transform: scale(1, 1); }\n  50% {\n    -webkit-transform: scale(1.5, 1.5);\n    -moz-transform: scale(1.5, 1.5);\n    transform: scale(1.5, 1.5); }\n  80% {\n    -webkit-transform: rotate(0.5);\n    -moz-transform: rotate(0.5);\n    transform: rotate(0.5); }\n  100% {\n    -webkit-transform: rotate(1);\n    -moz-transform: rotate(1);\n    transform: rotate(1); } }\n\n@keyframes scalezoom {\n  0% {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    transform: scale(1, 1); }\n  50% {\n    -webkit-transform: scale(1.5, 1.5);\n    -moz-transform: scale(1.5, 1.5);\n    transform: scale(1.5, 1.5); }\n  80% {\n    -webkit-transform: rotate(0.5);\n    -moz-transform: rotate(0.5);\n    transform: rotate(0.5); }\n  100% {\n    -webkit-transform: rotate(1);\n    -moz-transform: rotate(1);\n    transform: rotate(1); } }\n\n:host {\n  display: block;\n  height: 100%;\n  text-align: center;\n  margin: -0.625rem -0.625rem;\n  padding: 0.625rem 0.625rem;\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  background-image: linear-gradient(to bottom, #263238 0%, #2e3c44 100%);\n  background-repeat: repeat-x;\n  color: #ffffff; }\n\n#error-logo {\n  padding-top: 1rem;\n  font-size: 10rem;\n  height: 15rem;\n  color: #d9534f;\n  position: relative; }\n\n.monster-retina, .monster-eye {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  font-family: 'OpenSans-Bold', sans-serif;\n  margin-left: -2.55rem;\n  line-height: 2rem; }\n  .monster-retina:before, .monster-eye:before {\n    content: '.'; }\n\n.monster-layer {\n  position: absolute;\n  left: 50%;\n  margin-left: -5rem;\n  top: 50%;\n  margin-top: -5rem;\n  width: 10rem;\n  height: 11rem; }\n  .monster-layer:first-child {\n    opacity: 0.05;\n    animation: scalezoom 1s ease-in-out 250ms infinite; }\n  .monster-layer:nth-child(2) {\n    opacity: 0.1;\n    animation: scalezoom 1s ease-in-out 500ms infinite; }\n  .monster-layer:nth-child(3) {\n    opacity: 0.15;\n    animation: scalezoom 1s ease-in-out 750ms infinite; }\n  .monster-layer:nth-child(4) {\n    opacity: 0.2;\n    animation: scalezoom 1s ease-in-out 1000ms infinite; }\n  .monster-layer:nth-child(5) {\n    text-shadow: 0 0 1em rgba(255, 255, 255, 0.7), 0 0 0.2em rgba(255, 255, 255, 0.3); }\n\n.monster {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.monster-retina {\n  color: #000000;\n  font-size: 10rem;\n  margin-top: -4.5rem;\n  margin-left: -1.4rem; }\n\n.monster-eye {\n  color: #ffffff;\n  font-size: 18rem;\n  margin-top: -7.6rem;\n  line-height: 3.6rem; }\n\n#error-heading {\n  font-size: 10rem;\n  font-family: 'OpenSans-Bold', sans-serif;\n  line-height: 1; }\n"

/***/ }),

/***/ "./src/app/_common/shared/error/error.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feedback__ = __webpack_require__("./src/app/_common/shared/feedback/index.ts");


var ErrorService = (function () {
    function ErrorService(feedbackService) {
        this.feedbackService = feedbackService;
        this.errorHandler = new ErrorHandler();
    }
    ErrorService.prototype.init = function (error) {
        this.errorHandler.init(error);
        return this;
    };
    ErrorService.prototype.handle = function (statusCode, callbackfn, translationId) {
        this.errorHandler.handle(statusCode, callbackfn, translationId);
        return this;
    };
    ErrorService.prototype.notify = function () {
        this.feedbackService.notify({ heading: this.errorHandler.execute(), type: 'danger' });
    };
    ErrorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__feedback__["a" /* FeedbackService */]])
    ], ErrorService);
    return ErrorService;
}());

var ErrorHandler = (function () {
    function ErrorHandler() {
        this.rules = [];
        this.defaultRules = [
            { statusCode: 400, callbackfn: function (e) { return true; }, translationId: 'ERROR.BAD_REQUEST' },
            { callbackfn: function (e) { return true; }, translationId: 'ERROR.GENERAL_FAIL' }
        ];
    }
    ErrorHandler.prototype.init = function (error) {
        this.rules = [];
        this.error = error;
        return this;
    };
    ErrorHandler.prototype.handle = function (statusCode, callbackfn, translationId) {
        this.rules.push({ statusCode: statusCode, callbackfn: callbackfn, translationId: translationId });
        return this;
    };
    ErrorHandler.prototype.execute = function () {
        (_a = this.rules).push.apply(_a, this.defaultRules);
        for (var _i = 0, _b = this.rules; _i < _b.length; _i++) {
            var rule = _b[_i];
            if ((!rule.statusCode || rule.statusCode === this.error.status) && rule.callbackfn(this.error)) {
                return rule.translationId;
            }
        }
        var _a;
    };
    return ErrorHandler;
}());


/***/ }),

/***/ "./src/app/_common/shared/error/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__403_component__ = __webpack_require__("./src/app/_common/shared/error/403.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__403_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__404_component__ = __webpack_require__("./src/app/_common/shared/error/404.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__404_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__503_component__ = __webpack_require__("./src/app/_common/shared/error/503.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__503_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__error_service__ = __webpack_require__("./src/app/_common/shared/error/error.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__error_service__["a"]; });






/***/ }),

/***/ "./src/app/_common/shared/feedback/feedback.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var FeedbackService = (function () {
    function FeedbackService() {
        this.toasts = [];
    }
    FeedbackService_1 = FeedbackService;
    FeedbackService.prototype.notify = function (feedback) {
        var _this = this;
        feedback.type = feedback.type || 'info';
        this.toasts.unshift(feedback);
        feedback.timer = window.setTimeout(function () {
            _this.cancel(feedback);
        }, FeedbackService_1.delay);
    };
    FeedbackService.prototype.cancel = function (feedback) {
        var list = this.toasts;
        var index = list.indexOf(feedback);
        if (index !== -1) {
            if (feedback.timer) {
                clearTimeout(feedback.timer);
                feedback.timer = null;
            }
            list.splice(index, 1);
        }
    };
    FeedbackService.delay = 5000;
    FeedbackService = FeedbackService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], FeedbackService);
    return FeedbackService;
    var FeedbackService_1;
}());



/***/ }),

/***/ "./src/app/_common/shared/feedback/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__toaster_component__ = __webpack_require__("./src/app/_common/shared/feedback/toaster.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feedback_service__ = __webpack_require__("./src/app/_common/shared/feedback/feedback.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__feedback_service__["a"]; });




/***/ }),

/***/ "./src/app/_common/shared/feedback/toaster.component.scss":
/***/ (function(module, exports) {

module.exports = "/********************************\n    Custom theme values\n*********************************/\n/********************************************\n*********************************************\n          Override bootstrap values\n*********************************************\n*********************************************/\n@keyframes FeedbackItemAnimation {\n  0% {\n    -ms-transform: scaleY(0) translateY(50%);\n    -webkit-transform: scaleY(0) translateY(50%);\n    transform: scaleY(0) translateY(50%); }\n  100% {\n    -ms-transform: scaleY(1) translateY(0%);\n    -webkit-transform: scaleY(1) translateY(0%);\n    transform: scaleY(1) translateY(0%); } }\n\nalert {\n  animation: FeedbackItemAnimation 250ms;\n  margin: 0 0.625rem;\n  display: block;\n  position: relative; }\n\n.alert-body {\n  display: flex;\n  width: 100%;\n  padding-right: 1.25rem; }\n\n:host {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n\n.info {\n  flex: 1;\n  font-family: 'OpenSans-Light', sans-serif; }\n\n.heading {\n  font-family: 'OpenSans-Bold', sans-serif; }\n\n.link {\n  flex: 0 0 auto;\n  position: relative;\n  cursor: pointer;\n  padding: 0.3125rem 0; }\n"

/***/ }),

/***/ "./src/app/_common/shared/feedback/toaster.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToasterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__feedback_service__ = __webpack_require__("./src/app/_common/shared/feedback/feedback.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");


var ToasterComponent = (function () {
    function ToasterComponent(feedbackService) {
        this.feedbackService = feedbackService;
        this.toasts = this.feedbackService.toasts;
    }
    ToasterComponent.prototype.removeToast = function (toast) {
        this.feedbackService.cancel(toast);
    };
    ToasterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'toaster',
            template: "\n    <alert [type]=\"toast.type\" *ngFor=\"let toast of toasts\" dismissible=\"true\" (onClose)=\"removeToast(toast)\">\n      <div class=\"alert-body\">\n        <div class=\"info\">\n            <div class=\"heading\">{{toast.heading | translate:(toast.headingData || {})}}</div>\n            <div *ngIf=\"toast.body\">{{toast.body | translate:(toast.bodyData || {})}}</div>\n        </div>\n        <button class=\"btn link theme-icon-chevron-right align-icon-right\" *ngIf=\"toast.action\" (click)=\"toast.action.callback()\">\n            {{toast.action.text | translate:(toast.action.textData || {})}}\n        </button>\n      </div>\n    </alert>\n  ",
            styles: [__webpack_require__("./src/app/_common/shared/feedback/toaster.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__feedback_service__["a" /* FeedbackService */]])
    ], ToasterComponent);
    return ToasterComponent;
}());



/***/ }),

/***/ "./src/app/_common/shared/loading-indicator/loading-indicator.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingIndicatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loading_indicator_service__ = __webpack_require__("./src/app/_common/shared/loading-indicator/loading-indicator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");


var LoadingIndicatorComponent = (function () {
    function LoadingIndicatorComponent(loadingIndictorService) {
        this.indicatorStatus = loadingIndictorService.status;
    }
    LoadingIndicatorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'loading-indicator',
            template: "\n    <div id=\"loading-indicator\" *ngIf=\"indicatorStatus.isInProgress\">\n      <div id=\"loading-spinner\"></div>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__loading_indicator_service__["a" /* LoadingIndicatorService */]])
    ], LoadingIndicatorComponent);
    return LoadingIndicatorComponent;
}());



/***/ }),

/***/ "./src/app/_common/shared/loading-indicator/loading-indicator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingIndicatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var LoadingIndicatorService = (function () {
    function LoadingIndicatorService() {
        this.status = {
            isInProgress: false
        };
        this.counter = 0;
    }
    LoadingIndicatorService.prototype.start = function () {
        var _this = this;
        if (++this.counter === 1) {
            this.timer = window.setTimeout(function () {
                _this.setIndicator();
            }, 250);
        }
    };
    LoadingIndicatorService.prototype.done = function () {
        if (this.counter > 0) {
            if (--this.counter === 0) {
                clearTimeout(this.timer);
                this.timer = null;
                this.status.isInProgress = false;
            }
        }
    };
    LoadingIndicatorService.prototype.setIndicator = function () {
        this.status.isInProgress = true;
    };
    LoadingIndicatorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LoadingIndicatorService);
    return LoadingIndicatorService;
}());



/***/ }),

/***/ "./src/app/_common/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__breadcrumb_breadcrumb_component__ = __webpack_require__("./src/app/_common/shared/breadcrumb/breadcrumb.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feedback_toaster_component__ = __webpack_require__("./src/app/_common/shared/feedback/toaster.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loading_indicator_loading_indicator_component__ = __webpack_require__("./src/app/_common/shared/loading-indicator/loading-indicator.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__error__ = __webpack_require__("./src/app/_common/shared/error/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__breadcrumb_breadcrumb_service__ = __webpack_require__("./src/app/_common/shared/breadcrumb/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__feedback_feedback_service__ = __webpack_require__("./src/app/_common/shared/feedback/feedback.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__loading_indicator_loading_indicator_service__ = __webpack_require__("./src/app/_common/shared/loading-indicator/loading-indicator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__ = __webpack_require__("./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");














var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule_1 = SharedModule;
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */],
                __WEBPACK_IMPORTED_MODULE_7__feedback_feedback_service__["a" /* FeedbackService */],
                __WEBPACK_IMPORTED_MODULE_8__loading_indicator_loading_indicator_service__["a" /* LoadingIndicatorService */],
                __WEBPACK_IMPORTED_MODULE_5__error__["d" /* ErrorService */]
            ]
        };
    };
    SharedModule = SharedModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_11__angular_router__["a" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_13__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["a" /* AlertModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["e" /* ButtonsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["i" /* TabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["g" /* PaginationModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["c" /* BsDropdownModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["f" /* DatepickerModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["j" /* TooltipModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["k" /* TypeaheadModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap__["h" /* RatingModule */].forRoot()
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__breadcrumb_breadcrumb_component__["a" /* BreadcrumbComponent */], __WEBPACK_IMPORTED_MODULE_3__feedback_toaster_component__["a" /* ToasterComponent */], __WEBPACK_IMPORTED_MODULE_4__loading_indicator_loading_indicator_component__["a" /* LoadingIndicatorComponent */],
                __WEBPACK_IMPORTED_MODULE_5__error__["b" /* Error404Component */], __WEBPACK_IMPORTED_MODULE_5__error__["a" /* Error403Component */], __WEBPACK_IMPORTED_MODULE_5__error__["c" /* Error503Component */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__breadcrumb_breadcrumb_component__["a" /* BreadcrumbComponent */], __WEBPACK_IMPORTED_MODULE_3__feedback_toaster_component__["a" /* ToasterComponent */], __WEBPACK_IMPORTED_MODULE_4__loading_indicator_loading_indicator_component__["a" /* LoadingIndicatorComponent */],
                __WEBPACK_IMPORTED_MODULE_5__error__["b" /* Error404Component */], __WEBPACK_IMPORTED_MODULE_5__error__["a" /* Error403Component */], __WEBPACK_IMPORTED_MODULE_5__error__["c" /* Error503Component */]]
        })
    ], SharedModule);
    return SharedModule;
    var SharedModule_1;
}());



/***/ }),

/***/ "./src/app/_layout/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dispatcher_dispatcher_service__ = __webpack_require__("./src/app/_common/dispatcher/dispatcher.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_interface__ = __webpack_require__("./src/app/_layout/layout.interface.ts");



var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.toggleMainMenu = function () {
        __WEBPACK_IMPORTED_MODULE_1__common_dispatcher_dispatcher_service__["a" /* DispatcherService */].dispatch(__WEBPACK_IMPORTED_MODULE_2__layout_interface__["a" /* MAIN_MENU_TOGGLE */]);
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        }, 350);
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'header',
            template: "\n    <ul class=\"nav navbar-nav hidden-md-up\">\n      <li class=\"nav-item\">\n        <button class=\"nav-link navbar-toggler\" type=\"button\" (click)=\"toggleMainMenu()\">\u2630</button>\n      </li>\n    </ul>\n    <a class=\"navbar-brand\" [routerLink]=\"['.']\" title=\"{{'APP_NAME' | translate }}\">\n      <img class=\"logo\" src=\"assets/images/logotype.svg\" alt=\"{{'APP_NAME' | translate }}\"/>\n    </a>\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav hidden-sm-down\">\n        <li class=\"nav-item\">\n          <button class=\"nav-link navbar-toggler\" type=\"button\" (click)=\"toggleMainMenu()\">\u2630</button>\n        </li>\n      </ul>\n      <!--<form class=\"form-inline hidden-sm-down search-form\">-->\n      <!--<label for=\"search\" class=\"theme-icon-search search-icon\"></label>-->\n      <!--<input id=\"search\" class=\"search-control\" type=\"text\" placeholder=\"Search...\"/>-->\n      <!--</form>-->\n      <!--<info-dev></info-dev>-->\n    </div>\n    <ul class=\"nav hidden-sm-down\">\n      <!--<li class=\"nav-item float-right\"><button class=\"theme-icon-notification\"></button></li>-->\n      <!--<li class=\"nav-item float-right\"><button class=\"theme-icon-mail\"></button></li>-->\n    </ul>\n  ",
            host: {
                'class': 'navbar navbar-sticky-top navbar-inverse navbar-toggleable bg-inverse'
            }
        })
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/_layout/layout.interface.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MAIN_MENU_TOGGLE; });
var MAIN_MENU_TOGGLE = 'MAIN_MENU_TOGGLE';


/***/ }),

/***/ "./src/app/_layout/layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__header_component__ = __webpack_require__("./src/app/_layout/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mainnav_component__ = __webpack_require__("./src/app/_layout/mainnav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mainnav_service__ = __webpack_require__("./src/app/_layout/mainnav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_shared_shared_module__ = __webpack_require__("./src/app/_common/shared/shared.module.ts");








var LayoutModule = (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */], __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */], __WEBPACK_IMPORTED_MODULE_7__common_shared_shared_module__["a" /* SharedModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__header_component__["a" /* HeaderComponent */], __WEBPACK_IMPORTED_MODULE_5__mainnav_component__["a" /* MainNavComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__mainnav_service__["a" /* MainNav */]],
            exports: [__WEBPACK_IMPORTED_MODULE_4__header_component__["a" /* HeaderComponent */], __WEBPACK_IMPORTED_MODULE_5__mainnav_component__["a" /* MainNavComponent */]]
        })
    ], LayoutModule);
    return LayoutModule;
}());



/***/ }),

/***/ "./src/app/_layout/mainnav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainNavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_dispatcher_dispatcher_service__ = __webpack_require__("./src/app/_common/dispatcher/dispatcher.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layout_interface__ = __webpack_require__("./src/app/_layout/layout.interface.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mainnav_service__ = __webpack_require__("./src/app/_layout/mainnav.service.ts");




var MainNavComponent = (function () {
    function MainNavComponent(navService) {
        var _this = this;
        this.collapsed = false;
        __WEBPACK_IMPORTED_MODULE_1__common_dispatcher_dispatcher_service__["a" /* DispatcherService */].subscribe(__WEBPACK_IMPORTED_MODULE_2__layout_interface__["a" /* MAIN_MENU_TOGGLE */], function () {
            _this.collapsed = !_this.collapsed;
        });
        this.navigation = navService.navigation;
    }
    MainNavComponent.prototype.toggleSubMenu = function (area) {
        if (this.expandedArea === area) {
            this.expandedArea = null;
        }
        else {
            this.expandedArea = area;
        }
    };
    MainNavComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'main-nav',
            template: "\n    <ul class=\"navbar-nav\">\n      <li *ngFor=\"let item of navigation\"\n          [ngClass]=\"{\n        'nav-divider': item.divider,\n        'nav-item': !item.divider,\n        'nav-dropdown': item.children && item.children.length,\n        'open': item.areaName && expandedArea == item.areaName }\"\n          routerLinkActive=\"active\">\n        <a *ngIf=\"item.url\" [routerLink]=\"item.url\" class=\"nav-link\">\n          <i *ngIf=\"item.icon\" [class]=\"item.icon\"></i>\n          <span class=\"nav-link-text\">{{item.text | translate}}</span>\n        </a>\n        <a *ngIf=\"item.children\" (click)=\"toggleSubMenu(item.areaName)\" class=\"nav-link has-ul\">\n          <i *ngIf=\"item.icon\" [class]=\"item.icon\"></i>\n          <span class=\"nav-link-text\">{{item.text | translate}}</span>\n        </a>\n        <ul class=\"nav-dropdown-items\" *ngIf=\"item.children && item.children.length\">\n          <li class=\"nav-item\" routerLinkActive=\"active\" *ngFor=\"let subItem of item.children\">\n            <a [routerLink]=\"subItem.url\" class=\"nav-link\">\n              <i *ngIf=\"subItem.icon\" [class]=\"subItem.icon\"></i>\n              <span class=\"nav-link-text\">{{subItem.text | translate}}</span>\n            </a>\n          </li>\n        </ul>\n      </li>\n    </ul>\n  ",
            host: {
                'id': 'main-nav',
                'class': 'navbar-inverse',
                '[class.collapsed]': 'collapsed'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__mainnav_service__["a" /* MainNav */]])
    ], MainNavComponent);
    return MainNavComponent;
}());



/***/ }),

/***/ "./src/app/_layout/mainnav.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainNav; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__("./node_modules/ramda/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mainnav__ = __webpack_require__("./src/app/_layout/mainnav.ts");



var MainNav = (function () {
    function MainNav() {
        this.navigation = __WEBPACK_IMPORTED_MODULE_1_ramda__["f" /* forEach */](MainNav_1.copyClaimsToParent, __WEBPACK_IMPORTED_MODULE_2__mainnav__["a" /* NAVIGATION_DATA */]);
    }
    MainNav_1 = MainNav;
    MainNav.copyClaimsToParent = function (itemConfig) {
        if (!itemConfig.children) {
            return;
        }
        var childrenClaims = __WEBPACK_IMPORTED_MODULE_1_ramda__["e" /* flatten */](__WEBPACK_IMPORTED_MODULE_1_ramda__["g" /* map */](function (config) { return config.claims; }, itemConfig.children));
        if (__WEBPACK_IMPORTED_MODULE_1_ramda__["a" /* any */]((function (x) { return !x; }), childrenClaims)) {
            return;
        }
        itemConfig.claims = __WEBPACK_IMPORTED_MODULE_1_ramda__["e" /* flatten */]([itemConfig.claims || []]);
        itemConfig.claims = __WEBPACK_IMPORTED_MODULE_1_ramda__["j" /* union */](itemConfig.claims, childrenClaims);
    };
    MainNav = MainNav_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], MainNav);
    return MainNav;
    var MainNav_1;
}());



/***/ }),

/***/ "./src/app/_layout/mainnav.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NAVIGATION_DATA; });
var NAVIGATION_DATA = [
    {
        text: 'Home',
        icon: 'theme-icon-list',
        url: '/home'
    },
    {
        text: 'Components',
        icon: 'theme-icon-cards',
        areaName: 'PARK',
        children: [
            {
                text: 'Buttons',
                icon: 'theme-icon-list',
                url: '/buttons'
            },
            {
                text: 'Forms',
                icon: 'theme-icon-list',
                url: '/forms'
            },
            {
                text: 'Cards',
                icon: 'theme-icon-list',
                url: '/cards'
            },
            {
                text: 'Data grids',
                icon: 'theme-icon-list',
                url: '/table'
            },
            {
                text: 'Data lists',
                icon: 'theme-icon-list',
                url: '/data-list'
            },
            {
                text: 'Miscellaneous',
                icon: 'theme-icon-list',
                url: '/misc'
            }
        ]
    },
    {
        text: 'Graphics',
        icon: 'theme-icon-cards',
        areaName: 'GRAPHICS',
        children: [
            {
                text: 'Colors',
                icon: 'theme-icon-list',
                url: '/colors'
            },
            {
                text: 'Typefaces and icons',
                icon: 'theme-icon-list',
                url: '/typefaces'
            }
        ]
    }
];


/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<header></header>\n<main>\n  <main-nav></main-nav>\n  <div class=\"main-content\">\n    <div class=\"container-fluid\">\n      <router-outlet></router-outlet>\n    </div>\n    <toaster></toaster>\n  </div>\n</main>\n<!--<footer></footer>-->\n<loading-indicator></loading-indicator>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_chronos__ = __webpack_require__("./node_modules/ngx-bootstrap/chronos/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_locale__ = __webpack_require__("./node_modules/ngx-bootstrap/locale.js");





var AppComponent = (function () {
    function AppComponent(translate, title) {
        this.translate = translate;
        this.title = title;
        this.languages = [];
        this._initializeLanguages();
        Object(__WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_chronos__["a" /* defineLocale */])('de', __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_locale__["a" /* deLocale */]);
    }
    AppComponent.prototype._initializeLanguages = function () {
        this.languages = ['en', 'de'];
        this._initializeTranslateService('en');
        this._translateApplicationShell();
    };
    AppComponent.prototype._initializeTranslateService = function (defaultLanguage) {
        var userLang = navigator.language.split('-')[0];
        userLang = this.languages.indexOf(userLang) !== -1 ?
            userLang :
            defaultLanguage;
        this.translate.setDefaultLang(defaultLanguage);
        this.selectedLanguage = userLang;
        this.translate.use(userLang);
    };
    AppComponent.prototype._translateApplicationShell = function () {
        var _this = this;
        this.translate.get('APP_NAME').subscribe(function (data) {
            _this.title.setTitle(data);
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app',
            template: __webpack_require__("./src/app/app.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["Title"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/@ngx-translate/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__ = __webpack_require__("./node_modules/@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routes__ = __webpack_require__("./src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_dispatcher__ = __webpack_require__("./src/app/_common/dispatcher/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_modal_dialog__ = __webpack_require__("./node_modules/ngx-modal-dialog/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__ = __webpack_require__("./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__common_shared_shared_module__ = __webpack_require__("./src/app/_common/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__layout_layout_module__ = __webpack_require__("./src/app/_layout/layout.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");













function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, 'assets/locales/', "." + "6c7da2221fdcada224a14b4c26015363" + ".json");
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_6__common_dispatcher__["a" /* DispatcherModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: HttpLoaderFactory,
                        deps: [__WEBPACK_IMPORTED_MODULE_12__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__["i" /* TabsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__["g" /* PaginationModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__["c" /* BsDropdownModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__["h" /* RatingModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_8_ngx_modal_dialog__["a" /* ModalDialogModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__common_shared_shared_module__["a" /* SharedModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11__layout_layout_module__["a" /* LayoutModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routes__["a" /* appRouting */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export appRoutes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appRouting; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");

var appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' },
    { path: 'data-list', loadChildren: './data-list/data-list.module#DataListPageModule' },
    { path: 'buttons', loadChildren: './buttons/buttons.module#ButtonsPageModule' },
    { path: 'forms', loadChildren: './forms/forms.module#FormsPageModule' },
    { path: 'cards', loadChildren: './cards/cards.module#CardsPageModule' },
    { path: 'table', loadChildren: './table/table.module#TablePageModule' },
    { path: 'misc', loadChildren: './miscellaneous/miscellaneous.module#MiscPageModule' },
    { path: 'colors', loadChildren: './colors/colors.module#ColorsPageModule' },
    { path: 'typefaces', loadChildren: './typefaces/typefaces.module#TypefacesPageModule' }
];
var appRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(appRoutes);


/***/ }),

/***/ "./src/assets/styles/components/breadcrumbs.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/assets/styles/components/typeahead.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/assets/styles/theme.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/assets/styles/themeicons.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["main"] = main;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_styles_theme_scss__ = __webpack_require__("./src/assets/styles/theme.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_styles_theme_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_styles_theme_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_styles_themeicons_scss__ = __webpack_require__("./src/assets/styles/themeicons.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_styles_themeicons_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_styles_themeicons_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_styles_components_breadcrumbs_scss__ = __webpack_require__("./src/assets/styles/components/breadcrumbs.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__assets_styles_components_breadcrumbs_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__assets_styles_components_breadcrumbs_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_styles_components_typeahead_scss__ = __webpack_require__("./src/assets/styles/components/typeahead.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assets_styles_components_typeahead_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__assets_styles_components_typeahead_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_datepicker_bs_datepicker_css__ = __webpack_require__("./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_datepicker_bs_datepicker_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_datepicker_bs_datepicker_css__);









if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
function main() {
    'use strict';
    return Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
}
if (document.readyState === 'complete') {
    main();
}
else {
    document.addEventListener('DOMContentLoaded', main);
}


/***/ })

},["./src/main.ts"]);
//# sourceMappingURL=main.a89172b4d49d45448435.js.map