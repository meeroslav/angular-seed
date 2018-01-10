webpackJsonp([9],{

/***/ "./src/app/buttons/buttons.component.html":
/***/ (function(module, exports) {

module.exports = "<breadcrumb pageTitle=\"Buttons\" pageSubtitle=\"Park\"></breadcrumb>\n\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Simple button & states</h2>\n    <p>\n      <button class=\"btn\">Button</button>\n      <button class=\"btn active\">Active button</button>\n      <button class=\"btn focus\">Focus button</button>\n      <button class=\"btn\" disabled>Disabled button</button>\n    </p>\n  </div>\n</div>\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Alternative buttons</h2>\n    <p>\n      <button class=\"btn btn-primary\">Primary Button</button>\n      <button class=\"btn btn-secondary\">Secondary Button</button>\n      <button class=\"btn btn-info\">Info Button</button>\n      <button class=\"btn btn-success\">Success Button</button>\n      <button class=\"btn btn-warning\">Warning Button</button>\n      <button class=\"btn btn-danger\">Danger Button</button>\n    </p>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Outline buttons</h2>\n    <p>\n      <button class=\"btn btn-outline-primary\">Primary Button</button>\n      <button class=\"btn btn-outline-secondary\">Secondary Button</button>\n      <button class=\"btn btn-outline-info\">Info Button</button>\n      <button class=\"btn btn-outline-success\">Success Button</button>\n      <button class=\"btn btn-outline-warning\">Warning Button</button>\n      <button class=\"btn btn-outline-danger\">Danger Button</button>\n    </p>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Button sizes</h2>\n    <p>\n      <button class=\"btn btn-primary btn-lg\">Large Button</button>\n      <button class=\"btn btn-primary\">Normal Button</button>\n      <button class=\"btn btn-primary btn-sm\">Small Button</button>\n    </p>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Miscellaneous</h2>\n    <p>\n      <button class=\"btn btn-primary btn-block\">Button block</button>\n    </p>\n    <p>\n      <button class=\"btn btn-link\">Link Button</button>\n    </p>\n    <p>\n      <button class=\"btn btn-warning theme-icon-alert\">Button with left icon</button>\n      <button class=\"btn btn-info theme-icon-alert align-icon-right\">Button with right icon</button>\n    </p>\n    <p>\n      <button class=\"btn btn-success btn-block theme-icon-checkmark\">Button block with icon</button>\n    </p>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/buttons/buttons.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/buttons/buttons.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var ButtonsComponent = (function () {
    function ButtonsComponent() {
    }
    ButtonsComponent.prototype.ngOnInit = function () {
    };
    ButtonsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'buttons-page',
            styles: [__webpack_require__("./src/app/buttons/buttons.component.scss")],
            template: __webpack_require__("./src/app/buttons/buttons.component.html"),
            host: {
                'class': 'page'
            }
        })
    ], ButtonsComponent);
    return ButtonsComponent;
}());



/***/ }),

/***/ "./src/app/buttons/buttons.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonsPageModule", function() { return ButtonsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buttons_component__ = __webpack_require__("./src/app/buttons/buttons.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_shared_shared_module__ = __webpack_require__("./src/app/_common/shared/shared.module.ts");





var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__buttons_component__["a" /* ButtonsComponent */] }
];
var ButtonsPageModule = (function () {
    function ButtonsPageModule() {
    }
    ButtonsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__common_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__buttons_component__["a" /* ButtonsComponent */]]
        })
    ], ButtonsPageModule);
    return ButtonsPageModule;
}());



/***/ })

});
//# sourceMappingURL=9.6676079db7076a3649fa.chunk.js.map