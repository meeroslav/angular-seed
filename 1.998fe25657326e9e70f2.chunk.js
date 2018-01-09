webpackJsonp([1],{

/***/ "./node_modules/ngx-type-ahead/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./node_modules/ngx-type-ahead/src/typeahead.module.js"));
__export(__webpack_require__("./node_modules/ngx-type-ahead/src/typeahead.component.js"));


/***/ }),

/***/ "./node_modules/ngx-type-ahead/src/typeahead.component.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/mergeMap.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/take.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/toArray.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/filter.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/mergeAll.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/publishReplay.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var KEY_UP = 'keyup';
var KEY_DOWN = 'keydown';
var ARROW_DOWN = 'ArrowDown';
var ARROW_UP = 'ArrowUp';
var ESCAPE = 'Escape';
var ENTER = 'Enter';
var BACKSPACE = 'Backspace';
/**
 * Sanitize string for string comparison
 * @param {string} text
 */
var sanitizeString = function (text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
};
/***
 * Usage:
 *
 * <typeahead formControlName="myControlName" [suggestions]="['abc', 'def',...]"></typeahead>
 * <typeahead formControlName="myControlName" [suggestions]="Observable.of(['abc', 'def',...])"></typeahead>
 */
var TypeaheadComponent = (function () {
    /**
     * CTOR
     * @param elementRef
     * @param renderer
     */
    function TypeaheadComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        /** suggestions list - array of strings, objects or Observable */
        this.suggestions = [];
        /** field to use from objects as name */
        this.nameField = 'name';
        /** field to use from objects as id */
        this.idField = 'id';
        /** allow custom values */
        this.custom = true;
        /** allow multiple values */
        this.multi = false;
        /** use complex suggestions and results */
        this.complex = false;
        /** use complex suggestions and results */
        this.placeholder = '';
        /** Output value change */
        this.valueChange = new core_1.EventEmitter();
        // ui state
        this.isDisabled = false;
        this.isExpanded = false;
        this.dropDownClass = '';
        this.matches = [];
        // values
        this.values = [];
        this.callbackQueue = [];
        /**
         * Default values for TypeaheadSettings
         * @type TypeaheadSettings
         * @private
         */
        this._settings = {
            suggestionsLimit: 10,
            typeDelay: 50,
            noMatchesText: 'No matches found',
            tagClass: 'btn badge badge-primary',
            tagRemoveIconClass: '',
            dropdownMenuClass: 'dropdown-menu',
            dropdownMenuExpandedClass: 'dropdown-menu show',
            dropdownMenuItemClass: 'dropdown-item',
            dropdownToggleClass: 'dropdown-toggle'
        };
        this._inputChangeEvent = new core_1.EventEmitter();
        this._removeInProgress = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    Object.defineProperty(TypeaheadComponent.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        /** Value of form control */
        set: function (value) {
            Object.assign(this._settings, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadComponent.prototype, "multiBinding", {
        /** UI Bindings */
        get: function () { return this.multi; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadComponent.prototype, "disabledBinding", {
        get: function () { return this.isDisabled || null; },
        enumerable: true,
        configurable: true
    });
    TypeaheadComponent.prototype.focusOutHandler = function (event) {
        if (this.isDisabled) {
            return;
        }
        if (event.relatedTarget) {
            // related target is typeahead, input or one of the buttons
            if (event.relatedTarget === this.elementRef.nativeElement ||
                event.relatedTarget.parentElement === this.elementRef.nativeElement ||
                event.relatedTarget.parentElement.parentElement === this.elementRef.nativeElement) {
                // grab back input focus after button click since `focus out` cancelled it
                if (event.target === this._input && event.relatedTarget === this.elementRef.nativeElement) {
                    this._input.focus();
                }
                return;
            }
        }
        // close dropdown
        this.toggleDropdown(false);
        // keep just approved tags
        if (this.multi) {
            this._input.value = null;
            this._inputChangeEvent.emit('');
            return;
        }
        // trim values
        if (!this.custom || this.complex) {
            this._input.value = this._input.value.trim();
            // if not match then cleanup the values
            if (!this.hasMatch(this._input.value)) {
                this._input.value = this.value = null;
                this._inputChangeEvent.emit('');
            }
        }
    };
    /**
     * On component initialization
     */
    TypeaheadComponent.prototype.ngOnInit = function () {
        this.suggestionsInit(this.suggestions instanceof Observable_1.Observable ?
            this.suggestions
                .publishReplay(1)
                .refCount()
                .mergeAll() : Observable_1.Observable
            .of.apply(Observable_1.Observable, this.suggestions));
        this.toggleDropdown(false);
        this._inputChangeEvent.emit('');
    };
    TypeaheadComponent.prototype.ngOnChanges = function (changes) {
        if (changes.suggestions && !changes.suggestions.firstChange) {
            this.allMatchesSubscription.unsubscribe();
            this.matchesSubscription.unsubscribe();
            this.ngOnInit();
        }
    };
    TypeaheadComponent.prototype.suggestionsInit = function (suggestion$) {
        var _this = this;
        this.matchesSubscription = this._inputChangeEvent
            .debounceTime(this.settings.typeDelay)
            .mergeMap(function (value) {
            var normalizedValue = sanitizeString(value);
            var filteredSuggestions$ = suggestion$.filter(_this.filterSuggestion(normalizedValue));
            return _this.settings.suggestionsLimit ?
                filteredSuggestions$.take(_this.settings.suggestionsLimit).toArray() :
                filteredSuggestions$.toArray();
        })
            .subscribe(function (matches) {
            _this.matches = matches;
        });
        this.allMatchesSubscription = suggestion$.toArray().subscribe(function (suggestions) {
            _this.allMatches = suggestions;
            while (_this.callbackQueue.length) {
                // take first one and process it
                _this.callbackQueue.shift().apply(_this);
                _this._inputChangeEvent.emit('');
            }
        });
    };
    /**
     * Init method
     */
    TypeaheadComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // set value to input
        this._input = this.elementRef.nativeElement.querySelector('input');
        if (!this.multi && this._value) {
            var callback = function () {
                _this._input.value = _this.complex ?
                    _this.extractNameById(_this._value) :
                    _this._value;
            };
            if (this.allMatches || !this.complex) {
                callback.apply(this);
            }
            else {
                this.callbackQueue.push(callback);
            }
        }
    };
    /**
     * Cleanup timeout
     */
    TypeaheadComponent.prototype.ngOnDestroy = function () {
        this.allMatchesSubscription.unsubscribe();
        this.matchesSubscription.unsubscribe();
    };
    Object.defineProperty(TypeaheadComponent.prototype, "value", {
        /**
         * Value getter
         * @returns {string|string[]}
         */
        get: function () {
            return this._value;
        },
        /**
         * Value setter
         * @param value
         */
        set: function (value) {
            if (value === this._value) {
                return;
            }
            this.writeValue(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Update value on input change
     * @param event
     */
    TypeaheadComponent.prototype.handleInput = function (event) {
        var target = event.target;
        // if esc key, close dropdown
        if ([KEY_DOWN, KEY_UP].includes(event.type) && event.key === ESCAPE) {
            this.toggleDropdown(false);
            return;
        }
        // if arrow down, select first item in the menu
        if (event.type === KEY_DOWN && event.key === ARROW_DOWN && this.matches.length > 0) {
            var button = this.elementRef.nativeElement.querySelector('button[role="menuitem"]:first-child');
            button.focus();
            return;
        }
        this.toggleDropdown(true);
        if (this.multi || this.complex) {
            if (event.type === KEY_UP && event.key === ENTER && target.value !== '') {
                this.setValue(target.value);
                this.toggleDropdown(false);
            }
            if ([KEY_DOWN, KEY_UP].includes(event.type) && event.key === BACKSPACE) {
                if (target.value === '') {
                    if (event.type === KEY_DOWN) {
                        this._removeInProgress = true;
                    }
                    else if (this._removeInProgress) {
                        if (this.multi && this.values.length) {
                            this._removeInProgress = false;
                            this.removeValue(this.values[this.values.length - 1]);
                        }
                    }
                }
                else if (this.complex && !this.multi && event.type === KEY_DOWN) {
                    this.value = null;
                }
            }
        }
        else if (event.type === KEY_UP) {
            this.setValue(target.value);
            if (event.key === ENTER && target.value !== '') {
                this.toggleDropdown(false);
            }
        }
        this._inputChangeEvent.emit(target.value);
    };
    /**
     * Move through collection on dropdown
     * @param event
     * @param value
     */
    TypeaheadComponent.prototype.handleButton = function (event, value) {
        var target = event.target;
        if (event instanceof MouseEvent) {
            this.setValue(value, true);
            this._inputChangeEvent.emit(this._input.value);
            return;
        }
        if (event.type === KEY_UP) {
            if (event.key === ENTER) {
                this.setValue(value);
                this._inputChangeEvent.emit(this._input.value);
                this.toggleDropdown(false);
            }
            if (event.key === ESCAPE) {
                this._input.focus();
                this.toggleDropdown(false);
            }
        }
        else {
            if (event.key === ARROW_DOWN && target.nextElementSibling) {
                target.nextElementSibling.focus();
            }
            if (event.key === ARROW_UP && target.previousElementSibling) {
                target.previousElementSibling.focus();
            }
            target.parentNode.scrollTop = target.offsetTop;
        }
    };
    /**
     * Set value to list of values or as a single value
     * @param value
     * @param {boolean} collapseMenu
     */
    TypeaheadComponent.prototype.setValue = function (value, collapseMenu) {
        if ((!this.custom || this.complex) && !this.hasMatch(value)) {
            return;
        }
        if (this.multi) {
            if (!this.values.includes(value)) {
                this.value = this.values.concat(value).map(this.extractIdentifier.bind(this));
                this._input.value = '';
            }
        }
        else {
            this.value = this.extractIdentifier(value);
            this._input.value = this.extractName(value);
        }
        if (collapseMenu) {
            this.toggleDropdown(false);
        }
        // refocus the input
        this._input.focus();
    };
    /**
     * Remove value from list of values or clear out the value
     * @param value
     */
    TypeaheadComponent.prototype.removeValue = function (value) {
        var index = this.values.indexOf(value);
        if (index !== -1) {
            if (index === this.values.length - 1) {
                this.value = this.values.slice(0, -1).map(this.extractIdentifier.bind(this));
            }
            else {
                this.value = this.values.slice(0, index).concat(this.values.slice(index + 1)).map(this.extractIdentifier.bind(this));
            }
            this._inputChangeEvent.emit(this._input.value);
            this._input.focus();
        }
    };
    TypeaheadComponent.prototype.toggleDropdown = function (value) {
        if (value === undefined) {
            this._input.focus();
            this.isExpanded = !this.isExpanded;
        }
        else {
            this.isExpanded = value;
        }
        this.dropDownClass = this.isExpanded ? this.settings.dropdownMenuExpandedClass : this.settings.dropdownMenuClass;
    };
    /**
     * Write new value
     * @param value
     */
    TypeaheadComponent.prototype.writeValue = function (value) {
        // set value
        this._value = value;
        this.elementRef.nativeElement.value = value;
        // modify values list
        if (this.multi) {
            if (this.complex) {
                var callback = function () {
                    this.values = value ? value.map(this.parseObjectById.bind(this)) : [];
                    // make sure not found value doesn't break the UI
                    this.values = this.values.filter(function (val) { return !!val; });
                };
                if (this.allMatches || !value) {
                    callback.apply(this);
                }
                else {
                    this.callbackQueue.push(callback);
                }
            }
            else {
                this.values = value || [];
            }
        }
        // trigger change
        if ('createEvent' in document) {
            var event_1 = document.createEvent('HTMLEvents');
            event_1.initEvent('change', false, true);
            this.elementRef.nativeElement.dispatchEvent(event_1);
        }
        else {
            // we need to cast since fireEvent is not standard functionality and works only in IE
            this.elementRef.nativeElement.fireEvent('onchange');
        }
        this.onChange(value);
    };
    /**
     * Set disabled state of the component
     * @param {boolean} value
     */
    TypeaheadComponent.prototype.setDisabledState = function (value) {
        this.isDisabled = value;
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', value);
    };
    TypeaheadComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    TypeaheadComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {string} filter
     * @returns {(value: any) => boolean}
     */
    TypeaheadComponent.prototype.filterSuggestion = function (filter) {
        var _this = this;
        return function (value) {
            if (_this.values.includes(value)) {
                return false;
            }
            if (typeof value === 'string') {
                return sanitizeString(value).includes(filter);
            }
            else {
                return sanitizeString(value[_this.nameField]).includes(filter) &&
                    !_this.values.some(function (element) { return element[_this.idField] === value[_this.idField]; });
            }
        };
    };
    /**
     * Check if value has match
     * @param {string | Object} value
     * @returns {boolean}
     */
    TypeaheadComponent.prototype.hasMatch = function (value) {
        var sanitizedValue = typeof value === 'string' ? sanitizeString(value) : null;
        for (var key in this.matches) {
            if (typeof this.matches[key] === 'string') {
                var sanitizedMatch = sanitizeString(this.matches[key]);
                if (sanitizedMatch === sanitizedValue) {
                    return true;
                }
            }
            else {
                if (typeof value === 'string') {
                    var sanitizedMatch = sanitizeString(this.matches[key][this.nameField]);
                    if (sanitizedMatch === sanitizedValue) {
                        return true;
                    }
                }
                else {
                    if (this.matches[key][this.idField] === value[this.idField]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**
     * Get name by parsing id into object
     * @param id
     * @returns {string}
     */
    TypeaheadComponent.prototype.extractNameById = function (id) {
        var match = this.parseObjectById(id);
        if (match) {
            return match[this.nameField];
        }
        else {
            return '';
        }
    };
    /**
     * Get complex object from id
     * @param id
     * @returns {any}
     */
    TypeaheadComponent.prototype.parseObjectById = function (id) {
        for (var key in this.allMatches) {
            if (this.allMatches[key][this.idField] === id) {
                return this.allMatches[key];
            }
        }
        return null;
    };
    /**
     * Extract id field from the complex object by name or return value if it's string
     * @param {string | Object} value
     * @returns {any}
     */
    TypeaheadComponent.prototype.extractIdentifier = function (value) {
        var _this = this;
        if (this.complex) {
            if (typeof value === 'string') {
                var sanitizedValue_1 = sanitizeString(value);
                var match = this.allMatches.find(function (item) { return sanitizeString(item[_this.nameField]) === sanitizedValue_1; });
                if (match) {
                    return match[this.idField];
                }
                throw Error('Critical error: Match ID could not be extracted.');
            }
            return value[this.idField];
        }
        return value;
    };
    /**
     * Extract name from complex object or return value if it's string
     * @param {string | Object} value
     * @returns {any}
     */
    TypeaheadComponent.prototype.extractName = function (value) {
        if (this.complex && typeof value !== 'string') {
            return value[this.nameField];
        }
        return value;
    };
    return TypeaheadComponent;
}());
TypeaheadComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'type-ahead',
                styles: ["\n    :host {\n      height: auto;\n      min-height: 1em;\n      position: relative;\n      display: inline-flex;\n      flex-wrap: wrap;\n      -webkit-appearance: textfield;\n      -moz-appearance: textfield-multiline;\n      -webkit-rtl-ordering: logical;\n      user-select: text;\n      cursor: auto;\n    }\n    :host[disabled] {\n      cursor: not-allowed;\n    }\n    :host[disabled] input {\n      background-color: inherit;\n    }\n    :host .type-ahead-badge {\n      white-space: nowrap;\n      cursor: pointer;\n    }\n    :host input {\n      border: none;\n      outline: 0;\n      line-height: 1;\n      flex: 1;\n    }\n    :host [role=\"menuitem\"] {\n      cursor: pointer;\n    }\n    :host [role=\"menuitem\"][disabled] {\n      cursor: not-allowed;\n    }\n  "],
                template: "\n    <!-- default options item template -->\n    <ng-template #taItemTemplate let-value=\"item\">\n      {{ complex ? value[nameField] : value }}\n    </ng-template>\n\n    <span [ngClass]=\"settings.tagClass\" class=\"type-ahead-badge\" *ngFor=\"let value of values; let i = index\">\n      <ng-template [ngTemplateOutlet]=\"itemTemplate || taItemTemplate\"\n                 [ngTemplateOutletContext]=\"{ item: value, index: i, complex: complex, nameField: nameField }\"></ng-template>\n      <span *ngIf=\"!isDisabled\" aria-hidden=\"true\" (click)=\"removeValue(value)\"\n            [ngClass]=\"settings.tagRemoveIconClass\">\u00D7</span>\n    </span>\n    <input *ngIf=\"!isDisabled || !multi || !values.length\" \n           [disabled]=\"isDisabled || null\"\n           placeholder=\"{{(isDisabled || values.length) ? '' : placeholder}}\"\n           type=\"text\" autocomplete=\"off\"\n           (keyup)=\"handleInput($event)\"\n           (keydown)=\"handleInput($event)\"\n           (paste)=\"handleInput($event)\"\n           (click)=\"toggleDropdown(true)\"/>\n    <i *ngIf=\"!isDisabled\" (click)=\"toggleDropdown()\" tabindex=\"-1\"\n       [ngClass]=\"settings.dropdownToggleClass\"></i>\n    <div role=\"menu\" [attr.class]=\"dropDownClass\" *ngIf=\"matches.length || !custom\">\n      <button *ngFor=\"let match of matches; let i = index\" type=\"button\" role=\"menuitem\" tabindex=\"-1\"\n              [ngClass]=\"settings.dropdownMenuItemClass\"\n              (mouseup)=\"handleButton($event, match)\"\n              (keydown)=\"handleButton($event, match)\"\n              (keyup)=\"handleButton($event, match)\">\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || taItemTemplate\"\n                     [ngTemplateOutletContext]=\"{ item: match, index: i, complex: complex, nameField: nameField }\"></ng-template>\n      </button>\n      <div role=\"menuitem\" *ngIf=\"!matches.length && !custom\" tabindex=\"-1\" aria-disabled=\"true\" disabled=\"true\"\n           [ngClass]=\"settings.dropdownMenuItemClass\">\n        {{ settings.noMatchesText }}\n      </div>\n    </div>\n  ",
                providers: [{ provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return TypeaheadComponent; }), multi: true }]
            },] },
];
/** @nocollapse */
TypeaheadComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
    { type: core_1.Renderer2, decorators: [{ type: core_1.Inject, args: [core_1.Renderer2,] },] },
]; };
TypeaheadComponent.propDecorators = {
    'suggestions': [{ type: core_1.Input },],
    'itemTemplate': [{ type: core_1.Input },],
    'nameField': [{ type: core_1.Input },],
    'idField': [{ type: core_1.Input },],
    'custom': [{ type: core_1.Input },],
    'multi': [{ type: core_1.Input },],
    'complex': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'settings': [{ type: core_1.Input },],
    'multiBinding': [{ type: core_1.HostBinding, args: ['class.multi',] },],
    'disabledBinding': [{ type: core_1.HostBinding, args: ['attr.disabled',] },],
    'valueChange': [{ type: core_1.Output },],
    'focusOutHandler': [{ type: core_1.HostListener, args: ['focusout', ['$event'],] },],
};
exports.TypeaheadComponent = TypeaheadComponent;


/***/ }),

/***/ "./node_modules/ngx-type-ahead/src/typeahead.module.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var typeahead_component_1 = __webpack_require__("./node_modules/ngx-type-ahead/src/typeahead.component.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var TypeaheadModule = (function () {
    function TypeaheadModule() {
    }
    return TypeaheadModule;
}());
TypeaheadModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule],
                declarations: [typeahead_component_1.TypeaheadComponent],
                exports: [typeahead_component_1.TypeaheadComponent]
            },] },
];
/** @nocollapse */
TypeaheadModule.ctorParameters = function () { return []; };
exports.TypeaheadModule = TypeaheadModule;


/***/ }),

/***/ "./node_modules/rxjs/_esm5/ReplaySubject.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReplaySubject; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scheduler_queue__ = __webpack_require__("./node_modules/rxjs/_esm5/scheduler/queue.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Subscription__ = __webpack_require__("./node_modules/rxjs/_esm5/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__operators_observeOn__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/observeOn.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__ = __webpack_require__("./node_modules/rxjs/_esm5/util/ObjectUnsubscribedError.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SubjectSubscription__ = __webpack_require__("./node_modules/rxjs/_esm5/SubjectSubscription.js");
/** PURE_IMPORTS_START ._Subject,._scheduler_queue,._Subscription,._operators_observeOn,._util_ObjectUnsubscribedError,._SubjectSubscription PURE_IMPORTS_END */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






/**
 * @class ReplaySubject<T>
 */
var ReplaySubject = /*@__PURE__*/ (/*@__PURE__*/ function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) {
            bufferSize = Number.POSITIVE_INFINITY;
        }
        if (windowTime === void 0) {
            windowTime = Number.POSITIVE_INFINITY;
        }
        _super.call(this);
        this.scheduler = scheduler;
        this._events = [];
        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new __WEBPACK_IMPORTED_MODULE_4__util_ObjectUnsubscribedError__["a" /* ObjectUnsubscribedError */]();
        }
        else if (this.hasError) {
            subscription = __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else if (this.isStopped) {
            subscription = __WEBPACK_IMPORTED_MODULE_2__Subscription__["a" /* Subscription */].EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new __WEBPACK_IMPORTED_MODULE_5__SubjectSubscription__["a" /* SubjectSubscription */](this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new __WEBPACK_IMPORTED_MODULE_3__operators_observeOn__["a" /* ObserveOnSubscriber */](subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || __WEBPACK_IMPORTED_MODULE_1__scheduler_queue__["a" /* queue */]).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        // Trim events that fall out of the time window.
        // Start at the front of the list. Break early once
        // we encounter an event that falls within the window.
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(__WEBPACK_IMPORTED_MODULE_0__Subject__["a" /* Subject */]));
var ReplayEvent = /*@__PURE__*/ (/*@__PURE__*/ function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=ReplaySubject.js.map 


/***/ }),

/***/ "./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/distinctUntilChanged.js");
/** PURE_IMPORTS_START .._.._Observable,.._.._operator_distinctUntilChanged PURE_IMPORTS_END */


__WEBPACK_IMPORTED_MODULE_0__Observable__["Observable"].prototype.distinctUntilChanged = __WEBPACK_IMPORTED_MODULE_1__operator_distinctUntilChanged__["a" /* distinctUntilChanged */];
//# sourceMappingURL=distinctUntilChanged.js.map 


/***/ }),

/***/ "./node_modules/rxjs/_esm5/add/operator/mergeAll.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__operator_mergeAll__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/mergeAll.js");
/** PURE_IMPORTS_START .._.._Observable,.._.._operator_mergeAll PURE_IMPORTS_END */


__WEBPACK_IMPORTED_MODULE_0__Observable__["Observable"].prototype.mergeAll = __WEBPACK_IMPORTED_MODULE_1__operator_mergeAll__["a" /* mergeAll */];
//# sourceMappingURL=mergeAll.js.map 


/***/ }),

/***/ "./node_modules/rxjs/_esm5/add/operator/publishReplay.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__operator_publishReplay__ = __webpack_require__("./node_modules/rxjs/_esm5/operator/publishReplay.js");
/** PURE_IMPORTS_START .._.._Observable,.._.._operator_publishReplay PURE_IMPORTS_END */


__WEBPACK_IMPORTED_MODULE_0__Observable__["Observable"].prototype.publishReplay = __WEBPACK_IMPORTED_MODULE_1__operator_publishReplay__["a" /* publishReplay */];
//# sourceMappingURL=publishReplay.js.map 


/***/ }),

/***/ "./node_modules/rxjs/_esm5/operator/publishReplay.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = publishReplay;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__operators_publishReplay__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/publishReplay.js");
/** PURE_IMPORTS_START .._operators_publishReplay PURE_IMPORTS_END */

/* tslint:enable:max-line-length */
/**
 * @param bufferSize
 * @param windowTime
 * @param selectorOrScheduler
 * @param scheduler
 * @return {Observable<T> | ConnectableObservable<T>}
 * @method publishReplay
 * @owner Observable
 */
function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__operators_publishReplay__["a" /* publishReplay */])(bufferSize, windowTime, selectorOrScheduler, scheduler)(this);
}
//# sourceMappingURL=publishReplay.js.map 


/***/ }),

/***/ "./node_modules/rxjs/_esm5/operators/publishReplay.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = publishReplay;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ReplaySubject__ = __webpack_require__("./node_modules/rxjs/_esm5/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__multicast__ = __webpack_require__("./node_modules/rxjs/_esm5/operators/multicast.js");
/** PURE_IMPORTS_START .._ReplaySubject,._multicast PURE_IMPORTS_END */


/* tslint:enable:max-line-length */
function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
    if (selectorOrScheduler && typeof selectorOrScheduler !== 'function') {
        scheduler = selectorOrScheduler;
    }
    var selector = typeof selectorOrScheduler === 'function' ? selectorOrScheduler : undefined;
    var subject = new __WEBPACK_IMPORTED_MODULE_0__ReplaySubject__["a" /* ReplaySubject */](bufferSize, windowTime, scheduler);
    return function (source) { return Object(__WEBPACK_IMPORTED_MODULE_1__multicast__["a" /* multicast */])(function () { return subject; }, selector)(source); };
}
//# sourceMappingURL=publishReplay.js.map 


/***/ }),

/***/ "./src/app/forms/forms.component.html":
/***/ (function(module, exports) {

module.exports = "<breadcrumb pageTitle=\"Forms\" pageSubtitle=\"Park\"></breadcrumb>\n\n<tabset>\n  <tab heading=\"Basic controls\">\n    <div class=\"row\">\n      <div class=\"col-lg-6\">\n        <div class=\"card card-block\">\n          <h5>Basic form controls</h5>\n          <form [formGroup]=\"basicControlsForm\" novalidate>\n            <div class=\"row\">\n              <label class=\"col-sm-12 form-label\" for=\"name\">Name</label>\n              <div class=\"col-sm-10\">\n                <input type=\"text\" formControlName=\"name\" class=\"form-control\" id=\"name\" placeholder=\"Enter your name...\"\n                       placement=\"bottom\"\n                       [tooltip]=\"basicControlsForm.controls.name.errors && nameTT\" >\n                <ng-template #nameTT>\n                  {{'form.NAME_REQUIRED' | translate}}\n                </ng-template>\n              </div>\n            </div>\n            <div class=\"row\">\n              <label class=\"col-sm-3 form-label form-label-inline\" for=\"favoriteNumber\">Favorite number</label>\n              <div class=\"col-sm-4 col-lg-2\">\n                <input type=\"number\" formControlName=\"favoriteNumber\" class=\"form-control\" id=\"favoriteNumber\">\n              </div>\n              <label class=\"col-sm-3 form-label form-label-inline\" for=\"disabledNumber\">Disabled number</label>\n              <div class=\"col-sm-4 col-lg-2\">\n                <input type=\"number\" formControlName=\"disabledNumber\" class=\"form-control\" id=\"disabledNumber\">\n              </div>\n            </div>\n            <div class=\"row\">\n              <label class=\"col-sm-12 form-label\" for=\"favoriteColor\">Favorite color</label>\n              <div class=\"col-sm-6 col-lg-4\">\n                <select class=\"custom-select form-control\" formControlName=\"favoriteColor\" id=\"favoriteColor\" placement=\"right\"\n                        [tooltip]=\"basicControlsForm.controls.favoriteColor.errors && favoriteColorTT\" placeholder=\"Your color\">\n                  <option *ngFor=\"let color of colors\" [value]=\"color.id\">{{color.color}}</option>\n                </select>\n                <ng-template #favoriteColorTT>\n                  <div *ngIf=\"basicControlsForm.controls.favoriteColor.errors.required\">\n                    {{'form.FAVORITE_COLOR_REQUIRED' | translate}}\n                  </div>\n                </ng-template>\n              </div>\n            </div>\n            <div class=\"row\">\n              <label class=\"col-sm-12 form-label\" for=\"observation\">Observation</label>\n              <div class=\"col-sm-8\">\n                <textarea class=\"form-control\" formControlName=\"observation\" id=\"observation\" rows=\"4\"\n                          placeholder=\"Enter your observation...\" placement=\"bottom\"\n                          [tooltip]=\"basicControlsForm.controls.observation.errors && observationTT\"></textarea>\n                <ng-template #observationTT>\n                  <div *ngIf=\"basicControlsForm.controls.observation.errors.required\">\n                    This text will be super long text with lorem ipsum dolor sit amet.\n                  </div>\n                </ng-template>\n              </div>\n            </div>\n            <div class=\"row\">\n              <label class=\"col-sm-4 form-label\">Opt-in for goodies</label>\n              <div class=\"col-sm-12\">\n                <label class=\"custom-control custom-checkbox\" placement=\"bottom\"\n                       [tooltip]=\"basicControlsForm.controls.optin.errors && optinTT\">\n                  <input type=\"checkbox\" formControlName=\"optin\" class=\"custom-control-input\" value=\"\">\n                  <span class=\"custom-control-indicator\"></span>\n                  <span class=\"custom-control-description\">Remember my preference</span>\n                </label>\n                <ng-template #optinTT class=\"bollocks\">\n                  <div *ngIf=\"basicControlsForm.controls.optin.errors.required\">\n                    This text will be super long text with lorem ipsum dolor sit amet.\n                  </div>\n                </ng-template>\n              </div>\n            </div>\n            <div class=\"row\">\n              <label class=\"col-sm-4 form-label\">Receive news?</label>\n              <div class=\"col-sm-12\">\n                <label class=\"custom-control custom-radio\">\n                  <input type=\"radio\" formControlName=\"newsLetter\" class=\"custom-control-input\" value=\"Maybe\">\n                  <span class=\"custom-control-indicator\"></span>\n                  <span class=\"custom-control-description\">Maybe</span>\n                </label>\n                <label class=\"custom-control custom-radio\">\n                  <input type=\"radio\" formControlName=\"newsLetter\" class=\"custom-control-input\" value=\"No\">\n                  <span class=\"custom-control-indicator\"></span>\n                  <span class=\"custom-control-description\">Hell, no</span>\n                </label>\n                <label class=\"custom-control custom-radio\">\n                  <input type=\"radio\" formControlName=\"newsLetter\" class=\"custom-control-input\" value=\"Yes\">\n                  <span class=\"custom-control-indicator\"></span>\n                  <span class=\"custom-control-description\">Yeah</span>\n                </label>\n              </div>\n            </div>\n            <button class=\"btn btn-primary\" [disabled]=\"!basicControlsForm.valid\">Save data</button>\n          </form>\n        </div>\n      </div>\n      <div class=\"col-lg-6\">\n        <div class=\"card card-block\">\n          <h5>Form information</h5>\n          <p>Form Values</p>\n          <code>\n            {{basicControlsForm.value | json}}\n          </code>\n          <p>Form Status: {{basicControlsForm.status}}</p>\n        </div>\n      </div>\n    </div>\n  </tab>\n  <tab heading=\"Inline controls\">\n    <div class=\"row\">\n      <div class=\"col-lg-6\">\n        <div class=\"card card-block\">\n          <h5>Inline form controls</h5>\n          <form [formGroup]=\"basicControlsForm\" novalidate>\n            <div class=\"row\">\n              <div class=\"col-sm-10\">\n                <input type=\"text\" formControlName=\"name\" class=\"form-control\" id=\"name\" infield-label=\"Name\"\n                       placement=\"bottom\"\n                       [tooltip]=\"basicControlsForm.controls.favoriteNumber.errors && nameTT\" >\n                <ng-template #nameTT>\n                  <div *ngIf=\"basicControlsForm.controls.name.errors.required\">\n                    {{'form.NAME_REQUIRED' | translate}}\n                  </div>\n                </ng-template>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-lg-4\">\n                <input type=\"number\" formControlName=\"favoriteNumber\" class=\"form-control\" id=\"favoriteNumber\" infield-label=\"Favorite number\">\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-lg-4\">\n                <input type=\"number\" formControlName=\"disabledNumber\" class=\"form-control\" id=\"disabledNumber\" infield-label=\"Disabled number\">\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-6 col-lg-6\">\n                <select class=\"custom-select form-control\" formControlName=\"favoriteColor\" id=\"favoriteColor\" placement=\"right\"\n                        [tooltip]=\"basicControlsForm.controls.favoriteColor.errors && favoriteColorTT\" infield-label=\"Favourite color\">\n                  <option *ngFor=\"let color of colors\" [value]=\"color.id\">{{color.color}}</option>\n                </select>\n                <ng-template #favoriteColorTT>\n                  <div *ngIf=\"basicControlsForm.controls.favoriteColor.errors.required\">\n                    {{'form.FAVORITE_COLOR_REQUIRED' | translate}}\n                  </div>\n                </ng-template>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-10\">\n                <textarea class=\"form-control\" formControlName=\"observation\" id=\"observation\" rows=\"4\"\n                          infield-label=\"Observation\" placement=\"bottom\"\n                          [tooltip]=\"basicControlsForm.controls.observation.errors && observationTT\"></textarea>\n                <ng-template #observationTT>\n                  <div *ngIf=\"basicControlsForm.controls.observation.errors.required\">\n                    This text will be super long text with lorem ipsum dolor sit amet.\n                  </div>\n                </ng-template>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-12\">\n                <label class=\"custom-control custom-checkbox\" placement=\"bottom\"\n                       [tooltip]=\"basicControlsForm.controls.optin.errors && optinTT\">\n                  <input type=\"checkbox\" formControlName=\"optin\" class=\"custom-control-input\" value=\"\">\n                  <span class=\"custom-control-indicator\"></span>\n                  <span class=\"custom-control-description\">Remember my preference</span>\n                </label>\n                <ng-template #optinTT class=\"bollocks\">\n                  <div *ngIf=\"basicControlsForm.controls.optin.errors.required\">\n                    This text will be super long text with lorem ipsum dolor sit amet.\n                  </div>\n                </ng-template>\n              </div>\n            </div>\n            <div class=\"row\">\n              <label class=\"col-sm-4 form-label\">Receive news?</label>\n              <div class=\"col-sm-6\">\n                <div class=\"row\">\n                  <div class=\"col-sm-12\">\n                    <label class=\"custom-control custom-radio\">\n                      <input type=\"radio\" formControlName=\"newsLetter\" class=\"custom-control-input\" value=\"Maybe\">\n                      <span class=\"custom-control-indicator\"></span>\n                      <span class=\"custom-control-description\">Maybe</span>\n                    </label>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <label class=\"custom-control custom-radio\">\n                      <input type=\"radio\" formControlName=\"newsLetter\" class=\"custom-control-input\" value=\"No\">\n                      <span class=\"custom-control-indicator\"></span>\n                      <span class=\"custom-control-description\">Hell, no</span>\n                    </label>\n                  </div>\n                  <div class=\"col-sm-12\">\n                    <label class=\"custom-control custom-radio\">\n                      <input type=\"radio\" formControlName=\"newsLetter\" class=\"custom-control-input\" value=\"Yes\">\n                      <span class=\"custom-control-indicator\"></span>\n                      <span class=\"custom-control-description\">Yeah</span>\n                    </label>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n            <button class=\"btn btn-primary\" [disabled]=\"!basicControlsForm.valid\">Save data</button>\n          </form>\n        </div>\n      </div>\n      <div class=\"col-lg-6\">\n        <div class=\"card card-block\">\n          <h5>Form information</h5>\n          <p>Form Values</p>\n          <code>\n            {{basicControlsForm.value | json}}\n          </code>\n          <p>Form Status: {{basicControlsForm.status}}</p>\n        </div>\n      </div>\n    </div>\n  </tab>\n  <tab heading=\"Advanced controls\">\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n          <div class=\"card card-block\">\n            <h5>Advanced form controls</h5>\n            <form [formGroup]=\"advancedControlsForm\" novalidate>\n              <div class=\"row\">\n                <!-- Basic ratings component -->\n                <div class=\"col-sm-8\">\n                  <label for=\"firstRate\" class=\"form-label\">Ratings</label><br/>\n                  <rating formControlName=\"firstRate\" placement=\"right\" max=\"5\" id=\"firstRate\" tabindex=\"0\"\n                          [tooltip]=\"advancedControlsForm.controls.firstRate.errors && firstRateTT\"\n                          [customTemplate]=\"starTemplate\">\n                  </rating>\n                  <ng-template #starTemplate let-index=\"index\" let-value=\"value\">\n                    <i *ngIf=\"index < value\" class=\"theme-icon-star\"></i>\n                    <i *ngIf=\"index >= value\" class=\"theme-icon-star-o\"></i>\n                  </ng-template>\n                  <ng-template #firstRateTT>\n                    <div *ngIf=\"advancedControlsForm.controls.firstRate.errors.required\">\n                      This text will be super long text with lorem ipsum dolor sit amet.\n                    </div>\n                  </ng-template>\n                </div>\n                <div class=\"col-sm-8\">\n                  <rating formControlName=\"secondRate\" max=\"5\" tabindex=\"1\"\n                          [customTemplate]=\"starTemplate\">\n                  </rating>\n                </div>\n                <div class=\"col-sm-8\">\n                  <rating formControlName=\"averageRating\" max=\"5\" readonly=\"true\" tabindex=\"2\"\n                          [customTemplate]=\"starTemplate\">\n                  </rating>\n                </div>\n\n                <!-- static typeahed not editable field -->\n                <div class=\"col-sm-12\">\n                  <label class=\"form-label\">Static typeahead non editable - Star wars planets </label>\n                </div>\n                <div class=\"col-sm-8\">\n                  <type-ahead class=\"form-control\" formControlName=\"planet\"\n                             infield-label=\"Get planet\" custom=\"true\" multi=\"true\" [suggestions]=\"planetNames\"\n                             tabindex=\"3\">\n                  </type-ahead>\n                </div>\n                <div class=\"col-sm-12\">\n                  <label class=\"form-label\">Disabled typeahead</label>\n                </div>\n                <div class=\"col-sm-8\">\n                  <type-ahead class=\"form-control\" formControlName=\"planet2\"\n                             infield-label=\"Get planet\" custom=\"true\" multi=\"true\" [suggestions]=\"planetNames\"\n                             tabindex=\"4\">\n                  </type-ahead>\n                </div>\n\n                <!-- Tree component -->\n                <div class=\"col-sm-8\">\n                  <label for=\"category\" class=\"form-label\">Tree component</label>\n                  <tree formControlName=\"category\" class=\"form-control\" id=\"category\" tabindex=\"5\"\n                        [content]=\"treeData\"\n                        [collapsed]=\"true\"\n                        (nodeClick)=\"nodeSelectCallback($event)\"></tree>\n                </div>\n\n                <!-- Highlight area -->\n                <div class=\"col-sm-8\">\n                  <label for=\"randomText\" class=\"form-label\">Highlight area - marks: angular-*</label>\n                  <highlightarea formControlName=\"randomText\" [markerCallback]=\"markerCallback()\" tabindex=\"6\"\n                    infield-label=\"Highlights\"\n                    class=\"form-control\" id=\"randomText\"></highlightarea>\n                </div>\n              </div>\n              <button class=\"btn btn-primary\" [disabled]=\"!advancedControlsForm.valid\" tabindex=\"7\">Save data</button>\n            </form>\n          </div>\n        </div>\n        <div class=\"col-lg-6\">\n          <div class=\"card\">\n            <div class=\"card-block\">\n              <h5>Form information</h5>\n              <p>Form Values</p>\n              <code>\n                {{advancedControlsForm.value | json}}\n              </code>\n              <p>Form Status: {{basicControlsForm.status}}</p>\n            </div>\n          </div>\n        </div>\n      </div>\n  </tab>\n  <tab heading=\"Control Sizing\">\n    <h5>Inputs - Column sizing</h5>\n    <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <div class=\"card card-block\">\n          <div class=\"row\">\n            <div class=\"col-sm-2\">\n              <input type=\"email\" class=\"form-control\" placeholder=\"2x\">\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-sm-4\">\n              <input type=\"email\" class=\"form-control\" placeholder=\"4x\">\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-sm-6\">\n              <input type=\"email\" class=\"form-control\" placeholder=\"6x\">\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-6\">\n        <div class=\"card card-block\">\n          <div class=\"row\">\n            <div class=\"col-sm-8\">\n              <input type=\"email\" class=\"form-control\" placeholder=\"8x\">\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-sm-10\">\n              <input type=\"email\" class=\"form-control\" placeholder=\"10x\">\n            </div>\n          </div>\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <input type=\"email\" class=\"form-control\" placeholder=\"12x\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <h5>Half form</h5>\n    <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <div class=\"card card-block\">\n          <div class=\"row\">\n            <label class=\"col-sm-6 form-label form-label-inline\">Label for input</label>\n            <input type=\"text\" class=\"col-sm-6 form-control\" placeholder=\"Short input\">\n          </div>\n        </div>\n      </div>\n    </div>\n    <h5>Flex label form</h5>\n    <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <div class=\"card card-block\">\n          <div class=\"row\">\n            <label class=\"col col-auto form-label form-label-inline\">Label for input</label>\n            <input type=\"text\" class=\"col form-control\" placeholder=\"Short input\">\n          </div>\n        </div>\n      </div>\n    </div>\n    <h5>Floating elements</h5>\n    <div class=\"card card-block\">\n      <div class=\"row\">\n        <div class=\"col-sm-1\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Short\">\n        </div>\n        <div class=\"col-sm-2\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Small\">\n        </div>\n        <div class=\"col-sm-3\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Normal\">\n        </div>\n        <div class=\"col-sm-6\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Long input\">\n        </div>\n        <div class=\"col-sm-4\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Medium input\">\n        </div>\n        <div class=\"col-sm-8\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Extra long input\">\n        </div>\n        <div class=\"col-sm-12\">\n          <input type=\"email\" class=\"form-control\" placeholder=\"Crazy long input\">\n        </div>\n      </div>\n    </div>\n  </tab>\n</tabset>\n"

/***/ }),

/***/ "./src/app/forms/forms.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__forms_service__ = __webpack_require__("./src/app/forms/forms.service.ts");







var FormsComponent = (function () {
    function FormsComponent(formBuilder, service) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.service = service;
        this.planetNames = [];
        this.user = {
            name: '',
            favoriteNumber: null,
            favoriteColor: '',
            observation: '',
            optin: null,
            newsLetter: null
        };
        this.movie = {
            firstRate: null,
            secondRate: 2,
            averageRating: 3
        };
        this.colors = [
            { id: 1, color: 'Red' },
            { id: 2, color: 'Blue' },
            { id: 3, color: 'Green' }
        ];
        this.search = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            observer.next(_this.advancedControlsForm.controls['planet'].value);
        }).mergeMap(function (token) { return _this.getPlanetsAsObservable(token); });
    }
    FormsComponent.prototype.ngOnInit = function () {
        this.page = 1;
        this.getPlanets();
        this.buildBasicControlsForm();
        this.buildAdvancedControlsForm();
    };
    FormsComponent.prototype.getPlanets = function () {
        var _this = this;
        this.service.getAllStarships(this.page).subscribe(function (response) {
            _this.planets = response.results;
            _this.planetNames = _this.planets.map(function (planet) { return planet.name; });
            _this.treeData = _this.extendTree(_this.planets);
        });
    };
    FormsComponent.prototype.getFilteredPlanets = function (event) {
        function filterItem(item) {
            var itemUsed = event.existing.indexOf(item) !== -1;
            if (itemUsed) {
                return false;
            }
            return item.toLowerCase().indexOf(event.value.toLowerCase()) !== -1;
        }
        this.planetNames = this.planets.map(function (planet) { return planet.name; }).filter(filterItem);
    };
    FormsComponent.prototype.getPlanetsAsObservable = function (text$) {
        var _this = this;
        return text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(function (term) { return term.length < 2 ? []
            : _this.planets.filter(function (p) { return new RegExp(term, 'gi').test(p.name); }).splice(0, 10); });
    };
    FormsComponent.prototype.nodeSelectCallback = function (node) {
        console.debug(node);
    };
    FormsComponent.prototype.buildBasicControlsForm = function () {
        this.basicControlsForm = this.formBuilder.group({
            name: [this.user.name, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            favoriteNumber: [this.user.favoriteNumber],
            disabledNumber: [{ value: 3, disabled: true }],
            favoriteColor: [this.user.favoriteColor, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            observation: [this.user.observation, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            optin: [this.user.optin, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            newsLetter: [{ value: this.user.newsLetter }]
        });
    };
    FormsComponent.prototype.buildAdvancedControlsForm = function () {
        this.advancedControlsForm = this.formBuilder.group({
            firstRate: [this.movie.firstRate, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            secondRate: [this.movie.secondRate, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            averageRating: [{ value: this.movie.averageRating, disabled: true }],
            planet: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            planet2: [{ value: ['Orange', 'Apple', 'Kiwi'], disabled: true }],
            category: [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            randomText: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]
        });
    };
    FormsComponent.prototype.markerCallback = function () {
        return function (value) {
            var regex = new RegExp('angular-\\w*', 'g');
            var found = regex.exec(value);
            var results = [];
            while (found) {
                var result = {
                    value: found[0],
                    index: found.index,
                    duplicate: results.some(function (r) { return r.value === found[0]; })
                };
                results.push(result);
                found = regex.exec(value);
            }
            return results.map(function (res) {
                return { start: res.index, end: res.index + res.value.length, special: res.duplicate };
            });
        };
    };
    FormsComponent.prototype.extendTree = function (planets) {
        return planets.map(function (planet) {
            return {
                text: planet.name,
                children: planet.residents.map(function (resident) {
                    return {
                        text: resident,
                        id: resident
                    };
                })
            };
        });
    };
    FormsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'forms-page',
            template: __webpack_require__("./src/app/forms/forms.component.html"),
            host: {
                'class': 'page'
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_6__forms_service__["a" /* FormsService */]])
    ], FormsComponent);
    return FormsComponent;
}());



/***/ }),

/***/ "./src/app/forms/forms.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormsPageModule", function() { return FormsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forms_component__ = __webpack_require__("./src/app/forms/forms.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("./node_modules/@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap__ = __webpack_require__("./node_modules/ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__forms_service__ = __webpack_require__("./src/app/forms/forms.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_custom_components_custom_components_module__ = __webpack_require__("./src/app/_common/custom-components/custom-components.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_shared_shared_module__ = __webpack_require__("./src/app/_common/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_type_ahead__ = __webpack_require__("./node_modules/ngx-type-ahead/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_type_ahead___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ngx_type_ahead__);











var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__forms_component__["a" /* FormsComponent */] }
];
var FormsPageModule = (function () {
    function FormsPageModule() {
    }
    FormsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_9__common_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap__["h" /* TabsModule */],
                __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap__["i" /* TooltipModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10_ngx_type_ahead__["TypeaheadModule"],
                __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap__["g" /* RatingModule */],
                __WEBPACK_IMPORTED_MODULE_8__common_custom_components_custom_components_module__["a" /* CustomComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forChild(routes)
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__forms_service__["a" /* FormsService */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__forms_component__["a" /* FormsComponent */]]
        })
    ], FormsPageModule);
    return FormsPageModule;
}());



/***/ }),

/***/ "./src/app/forms/forms.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");


var FormsService = (function () {
    function FormsService(http) {
        this.http = http;
    }
    FormsService.prototype.getAllStarships = function (page) {
        return this.http.get("https://swapi.co/api/planets/?page=" + page);
    };
    FormsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], FormsService);
    return FormsService;
}());



/***/ })

});
//# sourceMappingURL=1.998fe25657326e9e70f2.chunk.js.map