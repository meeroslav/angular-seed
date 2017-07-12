import {Component, ContentChildren, AfterContentInit, Input, EventEmitter, Output} from '@angular/core';
import {WizardSlide} from './wizard-slide';
import {LoadingIndicatorService} from '../../shared/loading-indicator/loading-indicator.service';
/**
 *  Wizard use case
 *  <wizard>
 *    <simple-wizard-slide wizardTitle="First">
 *      content of the first slide
 *    </simple-wizard-slide>
 *    <simple-wizard-slide wizardTitle="Second" nextText="Save me and continue">
 *      This one will wait a bit
 *    </simple-wizard-slide>
 *    <wizard-slide wizardTitle="Third" nextText="Save final step">
 *    </wizard-slide>
 * </wizard>
 * <wizard [skipStep]="true">
 *   <simple-wizard-slide wizardTitle="First skip">
 *     content of the first slide
 *   </simple-wizard-slide>
 *   <simple-wizard-slide wizardTitle="Second skip">
 *     content of the second slide
 *   </simple-wizard-slide>
 *   <wizard-slide wizardTitle="Third skip">
 *   </wizard-slide>
 * </wizard>
 */
@Component({
  selector: 'wizard',
  template: `
    <ul *ngIf="slides.length > 1" class="wizard-nav">
      <li class="wizard-nav-item" *ngFor="let slide of slides; let i = index">
        <button class="wizard-nav-link" type="button"
                [class.active]="i <= _selectedIndex" [class.current]="i == _selectedIndex"
                (click)="selectSlide(slide, i)"
                [attr.disabled]="(!skipStep && i > _selectedIndex) || (!skipStep && !enabledBack && i < _selectedIndex)  ? true : null">
          {{ slide.wizardTitle }}
        </button>
      </li>
    </ul>
    <div class="wizard-content">
      <ng-content></ng-content>
    </div>
    <div class="wizard-footer">
      <button type="button" [ngClass]="previousButtonClass"
              *ngIf="_selectedIndex > 0 && enabledBack" (click)="previousSlide()">
        {{'PREVIOUS' | translate}}
      </button>
      <button *ngFor="let customButton of _selectedSlide.customButtons" type="button" [ngClass]="customButton.className"
              (click)="customButton.callback()">
        {{customButton.caption | translate}}
      </button>
      <button type="button" [ngClass]="[nextButtonClass, _nextIcon]" (click)="nextSlide()"
              [disabled]="_selectedSlide.nextEnabled && !_nextInProgress ? null : true">
        {{_selectedSlide.nextText | translate}}
      </button>
    </div>
  `,
  styleUrls: ['./wizard.component.scss'],
  host: {
    '[class.vertical]': 'vertical'
  }
})
export class Wizard implements AfterContentInit {
  @Input('skipStep') skipStep: boolean = false;
  @Input('vertical') vertical: boolean = false;
  @Input('enabledBack') enabledBack: boolean = true;
  @Input('previousButtonClass') previousButtonClass: string = 'btn btn-secondary theme-icon-chevron-left';
  @Input('nextButtonClass') nextButtonClass: string = 'btn btn-primary align-icon-right';
  @Output('finishWizard') finishWizard: EventEmitter<any> = new EventEmitter();
  @ContentChildren(WizardSlide) slides;

  _selectedIndex: number;
  _selectedSlide: WizardSlide;
  _nextIcon: string;
  _nextInProgress: boolean = false;

  /**
   * CTOR
   * @param _loadingService
   */
  constructor(private _loadingService: LoadingIndicatorService) {
  }

  /**
   * Initialize content
   */
  ngAfterContentInit() {
    this.selectSlide(this.slides.first, 0);
  }

  /**
   * Switch to next slide
   */
  nextSlide() {
    let slides = this.slides.toArray();
    this._loadingService.start();
    this._nextInProgress = true;
    slides[this._selectedIndex].validateNext().subscribe(() => {
      this._nextInProgress = false;
      this._loadingService.done();
      if (this._selectedIndex === slides.length - 1) {
        if (this.finishWizard) {
          this.finishWizard.emit(void 0);
        }
        return;
      }
      this._selectedIndex = this._selectedIndex + 1;
      this.selectSlide(slides[this._selectedIndex], this._selectedIndex);
    }, () => {
      this._nextInProgress = false;
      this._loadingService.done();
    });
  }

  /**
   * Switch to previous slide
   */
  previousSlide() {
    if (!this._selectedIndex || this._nextInProgress) {
      return;
    }
    let slides = this.slides.toArray();
    this.selectSlide(slides[this._selectedIndex - 1], this._selectedIndex - 1);
  }

  /**
   * Select slide
   * @param slide
   * @param index
   */
  selectSlide(slide: WizardSlide, index: number) {
    if (!slide || this._nextInProgress) {
      return;
    }
    if (!this.skipStep && index > this._selectedIndex) {
      return;
    }
    // deactivate all tabs
    this.slides.toArray().forEach((slide: WizardSlide) => {
      slide.setSelection(false);
    });

    // activate the slide the user has clicked on.
    slide.setSelection(true);
    this._selectedIndex = index;
    this._selectedSlide = slide;
    this._setSlideContent();
  }

  /**
   * Set text on next button
   * @private
   */
  private _setSlideContent() {
    if (this.slides.length - 1 === this._selectedIndex) {
      this._nextIcon = 'theme-icon-checkmark';
    } else {
      this._nextIcon = 'theme-icon-chevron-right';
    }
  }
}
