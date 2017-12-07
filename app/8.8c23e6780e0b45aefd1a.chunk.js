webpackJsonp([8],{

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(77);
var buttons_component_1 = __webpack_require__(851);
var core_2 = __webpack_require__(44);
var shared_module_1 = __webpack_require__(205);
var routes = [
    { path: '', component: buttons_component_1.ButtonsComponent }
];
var ButtonsPageModule = (function () {
    function ButtonsPageModule() {
    }
    ButtonsPageModule = __decorate([
        core_1.NgModule({
            imports: [
                core_2.TranslateModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes)
            ],
            declarations: [buttons_component_1.ButtonsComponent]
        })
    ], ButtonsPageModule);
    return ButtonsPageModule;
}());
exports.ButtonsPageModule = ButtonsPageModule;


/***/ }),

/***/ 851:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ButtonsComponent = (function () {
    function ButtonsComponent() {
    }
    ButtonsComponent.prototype.ngOnInit = function () {
    };
    ButtonsComponent = __decorate([
        core_1.Component({
            selector: 'buttons-page',
            styles: [__webpack_require__(852)],
            template: __webpack_require__(853),
            host: {
                'class': 'page'
            }
        })
    ], ButtonsComponent);
    return ButtonsComponent;
}());
exports.ButtonsComponent = ButtonsComponent;


/***/ }),

/***/ 852:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 853:
/***/ (function(module, exports) {

module.exports = "<breadcrumb pageTitle=\"Buttons\" pageSubtitle=\"Park\"></breadcrumb>\n\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Simple button & states</h2>\n    <p>\n      <button class=\"btn\">Button</button>\n      <button class=\"btn active\">Active button</button>\n      <button class=\"btn focus\">Focus button</button>\n      <button class=\"btn\" disabled>Disabled button</button>\n    </p>\n  </div>\n</div>\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Alternative buttons</h2>\n    <p>\n      <button class=\"btn btn-primary\">Primary Button</button>\n      <button class=\"btn btn-secondary\">Secondary Button</button>\n      <button class=\"btn btn-info\">Info Button</button>\n      <button class=\"btn btn-success\">Success Button</button>\n      <button class=\"btn btn-warning\">Warning Button</button>\n      <button class=\"btn btn-danger\">Danger Button</button>\n    </p>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Outline buttons</h2>\n    <p>\n      <button class=\"btn btn-outline-primary\">Primary Button</button>\n      <button class=\"btn btn-outline-secondary\">Secondary Button</button>\n      <button class=\"btn btn-outline-info\">Info Button</button>\n      <button class=\"btn btn-outline-success\">Success Button</button>\n      <button class=\"btn btn-outline-warning\">Warning Button</button>\n      <button class=\"btn btn-outline-danger\">Danger Button</button>\n    </p>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Button sizes</h2>\n    <p>\n      <button class=\"btn btn-primary btn-lg\">Large Button</button>\n      <button class=\"btn btn-primary\">Normal Button</button>\n      <button class=\"btn btn-primary btn-sm\">Small Button</button>\n    </p>\n  </div>\n</div>\n\n<div class=\"card\">\n  <div class=\"card-block\">\n    <h2>Miscellaneous</h2>\n    <p>\n      <button class=\"btn btn-primary btn-block\">Button block</button>\n    </p>\n    <p>\n      <button class=\"btn btn-link\">Link Button</button>\n    </p>\n    <p>\n      <button class=\"btn btn-warning theme-icon-alert\">Button with left icon</button>\n      <button class=\"btn btn-info theme-icon-alert align-icon-right\">Button with right icon</button>\n    </p>\n    <p>\n      <button class=\"btn btn-success btn-block theme-icon-checkmark\">Button block with icon</button>\n    </p>\n  </div>\n</div>\n"

/***/ })

});
//# sourceMappingURL=8.8c23e6780e0b45aefd1a.chunk.js.map