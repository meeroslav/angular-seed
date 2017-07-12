import { Component, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingIndicatorService } from '../../shared/loading-indicator/loading-indicator.service';

export interface ICustomSlideButton {
  caption?: string;
  className?: string;
  callback: () => void;
}

@Component({
  selector: 'wizard-slide',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardSlide {
  @Input('wizardTitle') wizardTitle: string;
  @Input('nextText') nextText: string = 'SAVE';

  // list of custom buttons
  customButtons: ICustomSlideButton[] = [];
  // is next button enabled
  nextEnabled: boolean = true;

  /**
   * CTOR
   * @param elementRef
   * @param loadingIndictorService
   */
  constructor(
      private elementRef: ElementRef,
      private loadingIndictorService: LoadingIndicatorService) { }

  /**
   * Set slide visibility
   * @param value
   */
  setSelection(value: boolean) {
    this.elementRef.nativeElement['hidden'] = !value;
  }

  /**
   * Validate next
   * @returns {any}
   */
  validateNext(): Observable<void> {
    return Observable.of(void 0);
  }

  /**
   * Trigger loading spinner, block the UI
   */
  startLoading() {
    this.loadingIndictorService.start();
  }

  /**
   * Remove subscription for loading spinner, un block the UI
   */
  doneLoading() {
    this.loadingIndictorService.done();
  }
}
