import { Directive, ElementRef, Renderer, OnInit, Input, DoCheck, AfterViewInit } from '@angular/core';

const WRAPPER_CLASS: string = 'infield-label-wrapper';
const LABEL_CLASS: string = 'infield-label';
const HAS_VALUE_CLASS: string = 'infield-label-active';

@Directive({
  selector: '[infield-label]'
})
export class InfieldLabelDirective implements OnInit, DoCheck, AfterViewInit {
  @Input('infield-label') placeholder: string;

  locationElement: HTMLLabelElement;
  placeholderElement: HTMLSpanElement;
  private loaded: boolean;

  /**
   * CTOR
   * @param elementRef
   * @param  {Renderer} renderer
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.locationElement = document.createElement('label');
    this.locationElement.classList.add(WRAPPER_CLASS);
    this.placeholderElement = document.createElement('span');
    this.placeholderElement.classList.add(LABEL_CLASS);
    this.loaded = false;
  }

  /**
   * On init if placeholder set wrap the form element
   * Attach a listener to keyup event
   */
  ngOnInit() {
    if (this.placeholder) {
      let nativeElem = this.elementRef.nativeElement;
      let parent = nativeElem.parentNode;
      parent.insertBefore(this.locationElement, nativeElem);
      this.locationElement.appendChild(nativeElem);
      // append placeholder
      this.placeholderElement.innerHTML = this.placeholder;
      this.locationElement.appendChild(this.placeholderElement);

      this.renderer.listen(nativeElem, 'keyup', (event: KeyboardEvent|ClipboardEvent) => {
        this.togglePlaceHolderVisibility();
      });
      this.renderer.listen(nativeElem, 'change', (event: KeyboardEvent|ClipboardEvent) => {
        this.togglePlaceHolderVisibility();
      });
    }
  }

  ngAfterViewInit() {
    if (this.placeholder) {
      this.togglePlaceHolderVisibility();
    }
  }

  /**
   * Selects work weird. Initially values are undefined so we need to wait for checks to verify true content
   */
  ngDoCheck() {
    if (this.elementRef.nativeElement.nodeName !== 'SELECT' || (this.elementRef.nativeElement.selectedIndex !== undefined && this.elementRef.nativeElement.selectedIndex >= 0)) {
      this.togglePlaceHolderVisibility();
    }
  }

  private togglePlaceHolderVisibility() {
    let value = !!this.elementRef.nativeElement.value || this.elementRef.nativeElement.selectedIndex >= 0;
    this.locationElement.classList.toggle(HAS_VALUE_CLASS, value);
  }
}
