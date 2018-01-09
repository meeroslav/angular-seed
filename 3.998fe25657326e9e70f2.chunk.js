webpackJsonp([3],{

/***/ "./src/app/miscellaneous/custom-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");

var CustomModalComponent = (function () {
    function CustomModalComponent() {
    }
    CustomModalComponent.prototype.dialogInit = function (reference, options) {
    };
    CustomModalComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'custom-modal',
            template: "\n    This component is custom\n  "
        })
    ], CustomModalComponent);
    return CustomModalComponent;
}());



/***/ }),

/***/ "./src/app/miscellaneous/miscellaneous.component.html":
/***/ (function(module, exports) {

module.exports = "<breadcrumb pageTitle=\"Miscellaneous\" pageSubtitle=\"Park\"></breadcrumb>\n\n<tabset>\n  <tab heading=\"Modal Dialog\">\n    <button class=\"btn btn-primary\" type=\"button\" (click)=\"openSimpleModal()\">Open simple modal</button>\n    <button class=\"btn btn-warning\" type=\"button\" (click)=\"openSimpleModalWithCallback()\">Open modal with close\n      callback\n    </button>\n    <button class=\"btn btn-danger\" type=\"button\" (click)=\"openPromptModal()\">Open modal with prompt</button>\n    <button class=\"btn btn-success\" type=\"button\" (click)=\"openCustomModal()\">Open custom modal component</button>\n  </tab>\n  <tab heading=\"Map\">\n    <div world-map id=\"world-map\" (change)=\"repositionTheDot($event)\">\n      <div class=\"badge badge-pill badge-primary\" id=\"dot\">Vienna</div>\n    </div>\n  </tab>\n  <tab>\n    <ng-template tabHeading><span class=\"icon-container theme-icon-plus\">Tab</span></ng-template>\n    This tab control\n  </tab>\n  <tab heading=\"Tree\">\n    <div class=\"row\">\n      <div class=\"col-md-6 col-sm-12\">\n        <div class=\"card card-block\">\n          <h4>Flat tree</h4>\n          <tree-node *ngFor=\"let node of treeData\" [content]=\"node\" [collapsed]=\"false\"></tree-node>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-md-6 col-sm-12\">\n        <div class=\"card card-block\">\n          <h4>Normal tree</h4>\n          <tree-node *ngFor=\"let node of treeDataMultiLevel\" [content]=\"node\" [collapsed]=\"false\"></tree-node>\n        </div>\n      </div>\n      <div class=\"col-md-6 col-sm-12\">\n        <div class=\"card card-block\">\n          <h4>Tree with icons</h4>\n          <tree-node *ngFor=\"let node of treeDataMultiLevelWithIcons\" [content]=\"node\" [collapsed]=\"false\"></tree-node>\n        </div>\n      </div>\n    </div>\n\n  </tab>\n  <tab heading=\"Date picker\">\n    <div class=\"row\">\n      <div class=\"col-sm-4\">\n        <div class=\"form-group has-feedback\">\n          <input type=\"text\"\n                 class=\"form-control\"\n                 [minDate]=\"minDate\"\n                 [maxDate]=\"maxDate\"\n                 #dp=\"bsDatepicker\"\n                 [bsConfig]=\"{ showWeekNumbers: false, containerClass: 'theme-blue' }\"\n                 bsDatepicker [(bsValue)]=\"dt\">\n          <i class=\"form-control-feedback theme-icon-calendar\" (click)=\"dp.show()\"></i>\n        </div>\n      </div>\n      <div class=\"col-sm-4\">\n        <div class=\"form-group has-feedback\">\n          <input type=\"text\"\n                 class=\"form-control\"\n                 [minDate]=\"minDate\"\n                 [maxDate]=\"maxDate\"\n                 #dp2=\"bsDatepicker\"\n                 bsDatepicker [(bsValue)]=\"dt\">\n          <i class=\"form-control-feedback theme-icon-calendar\" (click)=\"dp2.show()\"></i>\n        </div>\n      </div>\n      <div class=\"col-sm-4\">\n        <!--<bs-datepicker [(ngModel)]=\"dt\"></bs-datepicker>-->\n      </div>\n    </div>\n  </tab>\n  <tab heading=\"Wizard\">\n    <h4>With disabled skip forward</h4>\n    <wizard>\n      <simple-wizard-slide wizardTitle=\"First slide\">Some content on first slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Second slide\">Some content on second slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Third slide\">Some content on third slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Fourth slide\">Some content on fourth slide</simple-wizard-slide>\n    </wizard>\n    <h4>With disabled back</h4>\n    <wizard disableBack=\"true\">\n      <simple-wizard-slide wizardTitle=\"First slide\">Some content on first slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Second slide\">Some content on second slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Third slide\">Some content on third slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Fourth slide\">Some content on fourth slide</simple-wizard-slide>\n    </wizard>\n    <h4>With enabled skip forward</h4>\n    <wizard skipStep=\"true\">\n      <simple-wizard-slide wizardTitle=\"First slide\">Some content on first slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Second slide\">Some content on second slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Third slide\">Some content on third slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Fourth slide\">Some content on fourth slide</simple-wizard-slide>\n    </wizard>\n    <h4>Vertical wizard</h4>\n    <wizard skipStep=\"true\" vertical=\"true\">\n      <simple-wizard-slide wizardTitle=\"First slide\">\n        <p>Lorem ipsum dolor sit amet, at usu oblique persequeris, vero eirmod officiis pri ne. Definiebas\n          concludaturque an vix, populo insolens corrumpit ut eos, ei esse errem pertinax qui. Has at meis fuisset, mel\n          eius impedit facilis te. Mazim dicam ut per, vix meis dolore ut, et suas praesent vel. Duo an stet\n          necessitatibus, usu dicta laudem soluta ad. Mea epicurei probatus tacimates ut, nam ut stet libris possit, mel\n          ex illum mazim.</p>\n        <p>Utinam noster ex mea. Munere tritani sed eu, mel et ludus viderer quaestio. Ne errem accusamus nam, sit\n          homero partem placerat eu, stet illud eam in. Oratio tollit essent et vix, graece oporteat ne quo. Has et\n          ipsum ullum scaevola. Qui ea autem summo latine, ex vel virtute commune, ne putant audire incorrupte vim.\n          Aeterno aperiri usu ne.</p>\n        <p>Ei fugit liber disputationi usu, tamquam postulant torquatos ei sed. Elit vitae ad vis, id propriae indoctum\n          referrentur vix. Vis nostrud probatus adolescens cu, eam te corpora commune, ea facete reprimique ius. Mea\n          possit aliquip assentior ea, ceteros referrentur an per. Has an lobortis maiestatis, duo officiis voluptaria\n          constituto ei, ex eum appareat volutpat. Has mollis nostrum posidonium ea, eu postea vidisse nam.</p>\n        <p>Ea sit facilis lobortis qualisque, sed purto cibo quodsi in. Est intellegat consetetur in. Nostrud dolorem\n          salutandi sea in, sensibus assueverit ad ius. Vis cu ornatus efficiendi, odio causae incorrupte mel ex.</p>\n        <p>Pro an posse dicam evertitur, vix id semper legendos. Sea ex consequat dissentiet, ea liber verterem mandamus\n          sea. Id mea nemore impedit conclusionemque, sonet noster aliquid an sed. Usu te agam probatus, cum regione\n          labitur ne, et usu adipisci eloquentiam theophrastus. Per ne rebum nonumy persequeris, cu vis dicant tibique\n          contentiones. At nec invenire adipiscing, ut per iudico voluptaria, vel te sanctus qualisque.</p>\n      </simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Second slide\">Some content on second slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Third slide\">Some content on third slide</simple-wizard-slide>\n      <simple-wizard-slide wizardTitle=\"Fourth slide\">Some content on fourth slide</simple-wizard-slide>\n    </wizard>\n  </tab>\n  <tab heading=\"Loading indicator\">\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"showLoadingIndicator()\">Turn on loading indicator for 2 sec\n    </button>\n  </tab>\n  <tab heading=\"Toasters and Feedback\">\n    <button type=\"button\" class=\"btn btn-primary\" (click)=\"fireToast()\">Fire toast</button>\n    <button type=\"button\" class=\"btn btn-success\" (click)=\"fireToast(1)\">Fire toast with action</button>\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"fireToast(2)\">Fire toast with body</button>\n    <button type=\"button\" class=\"btn btn-info\" (click)=\"fireToast(3)\">Fire toast with body and action</button>\n  </tab>\n</tabset>\n"

/***/ }),

/***/ "./src/app/miscellaneous/miscellaneous.component.scss":
/***/ (function(module, exports) {

module.exports = "#world-map {\n  width: 100%;\n  height: 100%; }\n\n#dot {\n  position: absolute; }\n"

/***/ }),

/***/ "./src/app/miscellaneous/miscellaneous.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MiscComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_modal_dialog__ = __webpack_require__("./node_modules/ngx-modal-dialog/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_custom_components_world_map_world_map_component__ = __webpack_require__("./src/app/_common/custom-components/world-map/world-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_shared_loading_indicator_loading_indicator_service__ = __webpack_require__("./src/app/_common/shared/loading-indicator/loading-indicator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_shared_feedback_feedback_service__ = __webpack_require__("./src/app/_common/shared/feedback/feedback.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__custom_modal_component__ = __webpack_require__("./src/app/miscellaneous/custom-modal.component.ts");







var tree = [
    { text: 'Category 1', children: [{ id: '1', text: 'Sub-Category1' }, { id: '2', text: 'Sub-Category2' }] },
    { text: 'Category 2', children: [{ id: '1', text: 'Sub-Category1' }] },
    {
        text: 'Category 3', children: [
            { id: '1', text: 'Sub-Category1' },
            { id: '2', text: 'Sub-Category2' },
            { id: '3', text: 'Sub-Category3' }
        ]
    }
];
var MiscComponent = (function () {
    function MiscComponent(modalDialogService, loadingIndicator, viewContainer, element, feedbackService) {
        this.modalDialogService = modalDialogService;
        this.loadingIndicator = loadingIndicator;
        this.viewContainer = viewContainer;
        this.element = element;
        this.feedbackService = feedbackService;
        this.dateDisabled = [];
        this.dt = new Date();
        (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
        this.dateDisabled = [{ date: this.tomorrow, mode: 'day' }];
    }
    MiscComponent.prototype.ngOnInit = function () {
        this.selectedTreeNode = {};
        this.treeData = [{ text: 'Element One' }, { text: 'Element Two' }];
        this.treeDataMultiLevel = [{
                text: 'Element One',
                children: [{ text: 'child 11', children: [{ text: 'child 111' }] }, { text: 'child 12' }]
            }, {
                text: 'Element Two',
                children: [{ text: 'child 21' }, { text: 'child 22', children: [{ text: 'child 221' }] }]
            }];
        this.treeDataMultiLevelWithIcons = [{
                text: 'Element One', icon: 'theme-icon-star',
                children: [{
                        text: 'child 11',
                        icon: 'theme-icon-list',
                        children: [{ text: 'child 111', icon: 'theme-icon-notification' }]
                    }, { text: 'child 12' }]
            }, {
                text: 'Element Two', icon: 'theme-icon-question',
                children: [{ text: 'child 21', icon: 'theme-icon-cards' }, {
                        text: 'child 22',
                        icon: 'theme-icon-zoom-in',
                        children: [{ text: 'child 221' }]
                    }]
            }];
    };
    MiscComponent.prototype.openSimpleModal = function () {
        this.modalDialogService.openDialog(this.viewContainer, {
            title: 'Simple',
            childComponent: __WEBPACK_IMPORTED_MODULE_2_ngx_modal_dialog__["c" /* SimpleModalComponent */],
            settings: {
                closeButtonClass: 'close theme-icon-close'
            },
            data: {
                text: 'Some text content'
            }
        });
    };
    MiscComponent.prototype.openSimpleModalWithCallback = function () {
        this.modalDialogService.openDialog(this.viewContainer, {
            title: 'Simple',
            childComponent: __WEBPACK_IMPORTED_MODULE_2_ngx_modal_dialog__["c" /* SimpleModalComponent */],
            data: {
                text: 'Some text content. It will close after 1 sec.'
            },
            settings: {
                closeButtonClass: 'close theme-icon-close'
            },
            onClose: function () { return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 1000);
            }); }
        });
    };
    MiscComponent.prototype.openPromptModal = function () {
        this.modalDialogService.openDialog(this.viewContainer, {
            title: 'Simple',
            childComponent: __WEBPACK_IMPORTED_MODULE_2_ngx_modal_dialog__["c" /* SimpleModalComponent */],
            data: {
                text: 'Not so simple modal dialog. Do you agree?\n(It will close on Fine but fail on close)'
            },
            settings: {
                closeButtonClass: 'close theme-icon-close'
            },
            actionButtons: [
                {
                    text: 'Im fine, thanks',
                    onAction: function () { return new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, 20);
                    }); }
                },
                {
                    text: 'Brake, please',
                    onAction: function () { return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            reject();
                        }, 20);
                    }); }
                }
            ]
        });
    };
    MiscComponent.prototype.openCustomModal = function () {
        this.modalDialogService.openDialog(this.viewContainer, {
            title: 'Custom',
            childComponent: __WEBPACK_IMPORTED_MODULE_6__custom_modal_component__["a" /* CustomModalComponent */],
            settings: {
                closeButtonClass: 'close theme-icon-close'
            }
        });
    };
    MiscComponent.prototype.repositionTheDot = function (data) {
        var dot = this.element.nativeElement.querySelector('#dot');
        var cords = __WEBPACK_IMPORTED_MODULE_3__common_custom_components_world_map_world_map_component__["a" /* WorldMapComponent */].GetPercentagePosition(data, 16.363553, 48.186928);
        dot.style.left = cords.x + "%";
        dot.style.top = cords.y + "%";
    };
    MiscComponent.prototype.getTreeData = function () {
        return function () {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].of(tree);
        };
    };
    MiscComponent.prototype.nodeSelectCallback = function (node) {
        if (node) {
            this.selectedTreeNode = node;
        }
    };
    MiscComponent.prototype.showLoadingIndicator = function () {
        var _this = this;
        this.loadingIndicator.start();
        setTimeout(function () {
            _this.loadingIndicator.done();
        }, 2000);
    };
    MiscComponent.prototype.fireToast = function (type) {
        if (!type) {
            this.feedbackService.notify({ heading: 'A random toaster', type: 'success' });
            return;
        }
        if (type === 1) {
            this.feedbackService.notify({
                heading: 'A random toaster with action', action: {
                    text: 'My action', callback: function () {
                        alert('this is action');
                    }
                }
            });
        }
        if (type === 2) {
            this.feedbackService.notify({ heading: 'A random toaster with body', type: 'danger', body: 'This is some body text' });
        }
        if (type === 3) {
            this.feedbackService.notify({
                heading: 'A random toaster with action and body',
                type: 'warning',
                body: 'This is some body text',
                action: {
                    text: 'My action', callback: function () {
                        alert('this is action');
                    }
                }
            });
        }
    };
    MiscComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'misc-page',
            styles: [__webpack_require__("./src/app/miscellaneous/miscellaneous.component.scss")],
            template: __webpack_require__("./src/app/miscellaneous/miscellaneous.component.html"),
            host: {
                'class': 'page'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ngx_modal_dialog__["b" /* ModalDialogService */],
            __WEBPACK_IMPORTED_MODULE_4__common_shared_loading_indicator_loading_indicator_service__["a" /* LoadingIndicatorService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
            __WEBPACK_IMPORTED_MODULE_5__common_shared_feedback_feedback_service__["a" /* FeedbackService */]])
    ], MiscComponent);
    return MiscComponent;
}());



/***/ }),

/***/ "./src/app/miscellaneous/miscellaneous.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiscPageModule", function() { return MiscPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__miscellaneous_component__ = __webpack_require__("./src/app/miscellaneous/miscellaneous.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_modal_dialog__ = __webpack_require__("./node_modules/ngx-modal-dialog/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_custom_components_custom_components_module__ = __webpack_require__("./src/app/_common/custom-components/custom-components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__ = __webpack_require__("./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_shared_shared_module__ = __webpack_require__("./src/app/_common/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__custom_modal_component__ = __webpack_require__("./src/app/miscellaneous/custom-modal.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_datepicker_bs_datepicker_css__ = __webpack_require__("./node_modules/ngx-bootstrap/datepicker/bs-datepicker.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_datepicker_bs_datepicker_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_datepicker_bs_datepicker_css__);












var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__miscellaneous_component__["a" /* MiscComponent */] }
];
var MiscPageModule = (function () {
    function MiscPageModule() {
    }
    MiscPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__["h" /* TabsModule */],
                __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__["b" /* BsDatepickerModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5_ngx_modal_dialog__["a" /* ModalDialogModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_8__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_6__common_custom_components_custom_components_module__["a" /* CustomComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_9__common_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forChild(routes)
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__miscellaneous_component__["a" /* MiscComponent */], __WEBPACK_IMPORTED_MODULE_10__custom_modal_component__["a" /* CustomModalComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_10__custom_modal_component__["a" /* CustomModalComponent */]]
        })
    ], MiscPageModule);
    return MiscPageModule;
}());



/***/ })

});
//# sourceMappingURL=3.998fe25657326e9e70f2.chunk.js.map