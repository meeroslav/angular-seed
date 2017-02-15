import {
  Component, forwardRef, Input, OnDestroy, ElementRef, Output, ChangeDetectionStrategy,
  EventEmitter, Renderer, HostListener, AfterViewInit, Inject
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ITypeaheadChange {
  value: string;
  existing: string | string[];
}

const MINIMAL_WAIT = 100;
const MAXIMAL_WAIT = 800;

@Component({
  selector: 'typeahead',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="btn badge badge-primary align-icon-right" [class.app-icon-remove]="!isDisabled"
      [attr.tabindex]="isDisabled ? -1 : 0" [disabled]="isDisabled" type="button" 
      *ngFor="let tag of _multiValue" (click)="removeTag(tag)">{{tag}}</button>
    <input *ngIf="!isDisabled || !multiselect || !_multiValue.length" [disabled]="isDisabled" type="text" autocomplete="off"
      (keyup)="handleInput($event)"
      (keydown)="handleInput($event)"
      (paste)="handleInput($event)"
      (click)="toggleExpanded($event, true)"
    />

    <i class="dropdown-toggle" *ngIf="showSuggestions && !isDisabled" (click)="toggleExpanded($event)"></i>
    <div role="menu" class="dropdown-menu" *ngIf="showSuggestions">
      <button role="menuitem" class="dropdown-item" type="button" *ngFor="let suggestion of suggestions"
        (click)="addTag(suggestion)" (keydown)="handleButton($event)" (keyup)="handleButton($event)">
        {{suggestion}}
      </button>
      <button *ngIf="!suggestions.length" disabled="true" class="dropdown-item" type="button">
        {{'NO_RESULTS' | translate}}
      </button>      
    </div>
  `,
  styleUrls: ['./typeahead.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TypeaheadComponent), multi: true }],
  host: {
    '[class.show]': '_expanded',
    '[attr.disabled]': 'isDisabled || null',
    '[class.with-suggestions]': 'showSuggestions',
  }
})
export class TypeaheadComponent implements ControlValueAccessor, AfterViewInit , OnDestroy {
  @Output() valueChange = new EventEmitter();
  @Input() suggestions: string[] = []; // list of suggestions
  @Input() showSuggestions: boolean = true;
  @Input() multiselect: boolean = false; // can select multiple values
  @Input() custom: boolean = true; // can select custom value(s)

  // internal value
  _value: string;
  _multiValue: string[] = [];

  // ui state
  _expanded: boolean = false;

  private _safeToRemove = false;
  private _input: HTMLInputElement;
  private _timeOut: number;
  private _accumulatedTimeout: number;
  private isDisabled: boolean = false;

  /**
   * CTOR
   * @param elementRef
   * @param renderer
   */
  constructor(@Inject(ElementRef) private elementRef: ElementRef, @Inject(Renderer) private renderer: Renderer) {
    this._accumulatedTimeout = 0;
  }

  /**
   * Init method
   */
  ngAfterViewInit() {
      this._input = this.elementRef.nativeElement.querySelector('input');
  }

  /**
   * Cleanup timeout
   */
  ngOnDestroy(): void {
    this.cleanUpTimeout();
  }

  @HostListener('window:click', ['$event'])
  clickHandler(event) {
    let parent = event.target;
    while (parent && parent !== this.elementRef.nativeElement && parent !== document) {
      parent = parent.parentNode;
    }
    if (parent === document || !parent) {
      this._expanded = false;
      // if not custom and not in suggestions list
      if (!this.custom && this.suggestions.indexOf(this._input.value) === -1) {
        this._input.value = this.value = null;
        this._emitChangedEvent('');
      }
    }
  }

  /**
   * Remove tag from input
   * @param tag
   */
  removeTag(tag) {
    let index = this._multiValue.indexOf(tag);
    if (index !== -1) {
      if (index === this._multiValue.length - 1) {
        this.value = this._multiValue.slice(0, this._multiValue.length - 1);
      } else {
        this.value = this._multiValue.slice(0, index).concat(this._multiValue.slice(index + 1));
      }
    }
  }

  /**
   * Add new tag (on enter and datalist selection)
   * @param tag
   */
  addTag(tag: string) {
    if (!this.custom && this.suggestions.indexOf(tag) === -1) {
      return;
    }
    if (this.multiselect) {
      let notExists = !this._multiValue.length || this._multiValue.indexOf(tag) === -1;
      if (notExists && tag.length) {
        this.value = this._multiValue.concat([tag]);
        this._input.value = '';
        this._input.focus();
        this._expanded = false;
        this._emitChangedEvent('');
      }
    } else {
      this.value = tag;
      this._input.value = tag;
      this._input.focus();
      this._expanded = false;
      this._emitChangedEvent(tag);
    }
  }

  /**
   * Toggle dropdown
   */
  toggleExpanded(event: Event, value?: boolean) {
    event.stopPropagation();
    event.preventDefault();

    this._expanded = value !== void 0 ?
      value :
      !this._expanded;
  }

  /**
   * Value getter
   * @returns {string|string[]}
   */
  get value(): string | string[] {
    return this.multiselect ?
      this.getMultiValue() :
      this._value;
  };

  /**
   * Value setter
   * @param value
   */
  set value(value: string | string[]) {
    if ((this.multiselect && value === this.getMultiValue()) || value === this._value) {
      return;
    }

    this.writeValue(value);
  }

  /**
   * Update value on input change
   * @param event
   */
  handleInput(event: Event | KeyboardEvent) {
    event.stopPropagation(); // stop event bleeding

    let target = (event.target as HTMLInputElement);
    this._expanded = true;

    if (this.multiselect) {
      if (event.type === 'keydown' || event.type === 'keyup') {
        if ((event as KeyboardEvent).keyCode === 13 && target.value !== '') { // enter
          this.addTag(target.value);
        }
        if ((event as KeyboardEvent).keyCode === 8 && target.value === '') { // backspace
          if (event.type === 'keydown') {
            this._safeToRemove = true;
          } else if (this._safeToRemove && this._multiValue) {
            this._safeToRemove = false;
            this.removeTag(this._multiValue[this._multiValue.length - 1]);
          }
        }
      }
    }
    if (event.type === 'keydown' || event.type === 'keyup') {
      if ((event as KeyboardEvent).keyCode === 40 && this.suggestions.length > 0) { // arrow down
        let button = this.elementRef.nativeElement.querySelector('button.dropdown-item:first-child');
        this.renderer.invokeElementMethod(button, 'focus', []);
      }
    }
    this._emitChangedEvent(target.value);
  }

  /**
   * Move through collection on arrow commands
   * @param event
   */
  handleButton(event: KeyboardEvent) {
    event.stopPropagation(); // stop event bleeding

    let target = (event.target as HTMLButtonElement);

    if (event.type === 'keydown') {
      // this.scrollToTarget(target);

      if (event.keyCode === 40 && target.nextElementSibling) {  // arrow down
        this.renderer.invokeElementMethod(target.nextElementSibling, 'focus', []);
      }
      if (event.keyCode === 38 && target.previousElementSibling) { // arrow up
        this.renderer.invokeElementMethod(target.previousElementSibling, 'focus', []);
      }
    } else {
      this.scrollToTarget(target);
    }
  }

  /**
   * Scroll to focused element
   * @param target
   */
  scrollToTarget(target: any) {
    let parent = target.parentNode;
    parent.scrollTop = target.offsetTop;
  }

  /**
   * Write new value
   * @param value
   */
  writeValue(value: string | string[]): void {
    if (!value || !value.length) {
      value = void 0;
    }
    if (this.multiselect) {
      this._multiValue = value as string[] || [];
    } else {
      this._value = value as string;
    }

    this.elementRef.nativeElement.value = value;
    this.triggerOnChange(this.elementRef.nativeElement); // trigger on change event
    this.onChange(value);
  }

  triggerOnChange(element: any) {
    if ('createEvent' in document) {
      let evt = document.createEvent('HTMLEvents');
      evt.initEvent('change', false, true);
      element.dispatchEvent(evt);
    } else {
      element.fireEvent('onchange');
    }
  }

  setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }
  onChange = (_) => { /**/ };
  onTouched = () => { /**/ };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  /**
   * Emit value change event
   * @param value
   * @private
   */
  private _emitChangedEvent(value: string) {
    // only if wait is below threshold
    if (this._accumulatedTimeout < MAXIMAL_WAIT) {
      this.cleanUpTimeout();
    }
    // fire up new timeout
    this._timeOut = window.setTimeout(() => {
      let existingValues = this.multiselect && this._multiValue ? this._multiValue : [];
      this.valueChange.emit({ value: value, existing: existingValues });
      this._timeOut = null;
      this._accumulatedTimeout = 0;
    }, MINIMAL_WAIT);
  }

  /**
   * Helper for often access to same logic
   * @returns {string[]}
   */
  private getMultiValue(): string[] {
    return this._multiValue.length ? this._multiValue : null;
  }

  /**
   * Clear current timeout
   */
  private cleanUpTimeout() {
    if (this._timeOut) {
      this._accumulatedTimeout += MINIMAL_WAIT;
      clearTimeout(this._timeOut);
      this._timeOut = null;
    }
  }
}
