import { Component, ElementRef, forwardRef } from '@angular/core';
import { WizardSlide } from './wizard-slide';
import { LoadingIndicatorService } from '../../shared/loading-indicator/loading-indicator.service';

@Component({
  selector: 'simple-wizard-slide',
  template: `
        <ng-content></ng-content>
    `,
  providers: [{ provide: WizardSlide, useExisting: forwardRef(() => SimpleWizardSlide), multi: true }]
})
export class SimpleWizardSlide extends WizardSlide {

  constructor(elementRef: ElementRef, loadingIndicatorService: LoadingIndicatorService) {
    super(elementRef, loadingIndicatorService);
  }
}
