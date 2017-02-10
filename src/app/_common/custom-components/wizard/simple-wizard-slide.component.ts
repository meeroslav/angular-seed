import { Component, forwardRef } from '@angular/core';
import { WizardSlide } from './wizard-slide';

@Component({
  selector: 'simple-wizard-slide',
  template: `
        <ng-content></ng-content>
    `,
  providers: [{ provide: WizardSlide, useExisting: forwardRef(() => SimpleWizardSlide), multi: true }]
})
export class SimpleWizardSlide extends WizardSlide {
}
