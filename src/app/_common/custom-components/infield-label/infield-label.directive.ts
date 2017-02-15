import { Directive, ElementRef, Renderer, Input, AfterViewInit } from '@angular/core';

const WRAPPER_CLASS: string = 'infield-label-wrapper';
const LABEL_CLASS: string = 'infield-label';
const HAS_VALUE_CLASS: string = 'infield-label-active';

@Directive({
  selector: '[infield-label]'
})
export class InfieldLabelDirective implements AfterViewInit {
  @Input('infield-label') placeholder: string;

  locationElement: HTMLLabelElement;
  placeholderElement: HTMLSpanElement;

  private loaded: boolean;
  private nativeElem: any;

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
  ngAfterViewInit() {
    this.nativeElem = this.elementRef.nativeElement;

    if (this.placeholder) {
      let parent = this.nativeElem.parentNode;
      parent.insertBefore(this.locationElement, this.nativeElem);
      this.locationElement.appendChild(this.nativeElem);
      // append placeholder
      this.placeholderElement.innerHTML = this.placeholder;
      this.locationElement.appendChild(this.placeholderElement);

      this.renderer.listen(this.nativeElem, 'keyup',   () => { this.togglePlaceHolderVisibility(); });
      this.renderer.listen(this.nativeElem, 'change',  () => { this.togglePlaceHolderVisibility(); });
      this.renderer.listen(this.nativeElem, 'blur',    () => { this.togglePlaceHolderVisibility(); });
      this.renderer.listen(this.nativeElem, 'focusout', () => { this.togglePlaceHolderVisibility(); });

      this.renderer.listen(this.nativeElem, 'focusin',
        () => { this.locationElement.classList.toggle(HAS_VALUE_CLASS, true); });
      this.renderer.listen(this.nativeElem, 'focus',
        () => { this.locationElement.classList.toggle(HAS_VALUE_CLASS, true); });

      /** run initial check */
      this.togglePlaceHolderVisibility();
    }
  }

  private togglePlaceHolderVisibility() {
    let value = !!this.nativeElem.value || this.nativeElem.selectedIndex >= 0;
    this.locationElement.classList.toggle(HAS_VALUE_CLASS, value);
  }
}
