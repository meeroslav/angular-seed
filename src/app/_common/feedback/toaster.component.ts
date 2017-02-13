import { FeedbackService, IFeedback } from './feedback.service';
import { Component } from '@angular/core';

@Component({
  selector: 'toaster',
  template: `
      <div class="feedback-wrapper">
          <div class="feedback-item" *ngFor="let toast of toasts">
              <div class="feedback-info">
                  <div class="feedback-heading">{{toast.heading | translate:(toast.headingData || {})}}</div>
                  <div *ngIf="toast.body">{{toast.body | translate:(toast.bodyData || {})}}</div>
              </div>
              <div class="feedback-link app-icon-chevron-right" *ngIf="toast.action" (click)="toast.action.callback()">
                  {{toast.action.text | translate:(toast.action.textData || {})}}
              </div>
              <div class="feedback-close app-icon-close" (click)="removeToast(toast)"></div>
          </div>
      </div>
  `,
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  toasts: Array<IFeedback>;

  constructor(private feedbackService: FeedbackService) {
    this.toasts = this.feedbackService.toasts;
  }

  removeToast(toast: IFeedback) {
    this.feedbackService.cancel(toast);
  }
}
