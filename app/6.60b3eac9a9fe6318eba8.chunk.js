webpackJsonp([6],{

/***/ 814:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var router_1 = __webpack_require__(77);
var colors_component_1 = __webpack_require__(867);
var core_2 = __webpack_require__(44);
var shared_module_1 = __webpack_require__(205);
var routes = [
    { path: '', component: colors_component_1.ColorsComponent }
];
var ColorsPageModule = (function () {
    function ColorsPageModule() {
    }
    ColorsPageModule = __decorate([
        core_1.NgModule({
            imports: [
                core_2.TranslateModule,
                shared_module_1.SharedModule,
                router_1.RouterModule.forChild(routes)
            ],
            declarations: [colors_component_1.ColorsComponent]
        })
    ], ColorsPageModule);
    return ColorsPageModule;
}());
exports.ColorsPageModule = ColorsPageModule;


/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ColorsComponent = (function () {
    function ColorsComponent() {
    }
    ColorsComponent.prototype.ngOnInit = function () {
    };
    ColorsComponent = __decorate([
        core_1.Component({
            selector: 'colors-page',
            styles: [__webpack_require__(868)],
            template: __webpack_require__(869),
            host: {
                'class': 'page'
            }
        })
    ], ColorsComponent);
    return ColorsComponent;
}());
exports.ColorsComponent = ColorsComponent;


/***/ }),

/***/ 868:
/***/ (function(module, exports) {

module.exports = "/********************************\n    Custom theme values\n*********************************/\n/********************************************\n*********************************************\n          Override bootstrap values\n*********************************************\n*********************************************/\n.color-block {\n  height: 3rem; }\n\n.color-info {\n  font-family: 'OpenSans-Bold', sans-serif; }\n"

/***/ }),

/***/ 869:
/***/ (function(module, exports) {

module.exports = "<breadcrumb pageTitle=\"Colors\" pageSubtitle=\"Park\"></breadcrumb>\n\n<h2>Main colors</h2>\n<div class=\"row\">\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #2196f3\"></div>\n    <div><span class=\"color-info\">Variable:</span> $brand-primary</div>\n    <div><span class=\"color-info\">Value:</span> #2196f3</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #5cb85c\"></div>\n    <div><span class=\"color-info\">Variable:</span> $brand-success</div>\n    <div><span class=\"color-info\">Value:</span> #5cb85c</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #5bc0de\"></div>\n    <div><span class=\"color-info\">Variable:</span> $brand-info</div>\n    <div><span class=\"color-info\">Value:</span> #5bc0de</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #f0ad4e\"></div>\n    <div><span class=\"color-info\">Variable:</span> $brand-warning</div>\n    <div><span class=\"color-info\">Value:</span> #f0ad4e</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #d9534f\"></div>\n    <div><span class=\"color-info\">Variable:</span> $brand-danger</div>\n    <div><span class=\"color-info\">Value:</span> #d9534f</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #263238\"></div>\n    <div><span class=\"color-info\">Variable:</span> $brand-inverse</div>\n    <div><span class=\"color-info\">Value:</span> #263238</div>\n  </div>\n</div>\n\n<h2>Rainbow palette</h2>\n<div class=\"row\">\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #d9534f\"></div>\n    <div><span class=\"color-info\">Variable:</span> $red</div>\n    <div><span class=\"color-info\">Value:</span> #d9534f</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #f0ad4e\"></div>\n    <div><span class=\"color-info\">Variable:</span> $orange</div>\n    <div><span class=\"color-info\">Value:</span> #f0ad4e</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #ffd500\"></div>\n    <div><span class=\"color-info\">Variable:</span> $yellow</div>\n    <div><span class=\"color-info\">Value:</span> #ffd500</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #5cb85c\"></div>\n    <div><span class=\"color-info\">Variable:</span> $green</div>\n    <div><span class=\"color-info\">Value:</span> #5cb85c</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #2196f3\"></div>\n    <div><span class=\"color-info\">Variable:</span> $blue</div>\n    <div><span class=\"color-info\">Value:</span> #2196f3</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #5bc0de\"></div>\n    <div><span class=\"color-info\">Variable:</span> $teal</div>\n    <div><span class=\"color-info\">Value:</span> #5bc0de</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #ff5b77\"></div>\n    <div><span class=\"color-info\">Variable:</span> $pink</div>\n    <div><span class=\"color-info\">Value:</span> #ff5b77</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #613d7c\"></div>\n    <div><span class=\"color-info\">Variable:</span> $purple</div>\n    <div><span class=\"color-info\">Value:</span> #613d7c</div>\n  </div>\n</div>\n\n<h2>Gray shades</h2>\n<div class=\"row\">\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #fff\"></div>\n    <div><span class=\"color-info\">Variable:</span> $white</div>\n    <div><span class=\"color-info\">Value:</span> #fff</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #efefef\"></div>\n    <div><span class=\"color-info\">Variable:</span> $gray-lightest</div>\n    <div><span class=\"color-info\">Value:</span> #efefef</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #e3e3e3\"></div>\n    <div><span class=\"color-info\">Variable:</span> $gray-lighter</div>\n    <div><span class=\"color-info\">Value:</span> #e3e3e3</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #8E97A8\"></div>\n    <div><span class=\"color-info\">Variable:</span> $gray-light</div>\n    <div><span class=\"color-info\">Value:</span> #8E97A8</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #2e3c44\"></div>\n    <div><span class=\"color-info\">Variable:</span> $gray</div>\n    <div><span class=\"color-info\">Value:</span> #2e3c44</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #263238\"></div>\n    <div><span class=\"color-info\">Variable:</span> $gray-dark</div>\n    <div><span class=\"color-info\">Value:</span> #263238</div>\n  </div>\n  <div class=\"col-lg-1 col-sm-4\">\n    <div class=\"color-block\" style=\"background-color: #000\"></div>\n    <div><span class=\"color-info\">Variable:</span> $black</div>\n    <div><span class=\"color-info\">Value:</span> #000</div>\n  </div>\n</div>\n"

/***/ })

});
//# sourceMappingURL=6.60b3eac9a9fe6318eba8.chunk.js.map