import { FeedbackService, IFeedback } from './feedback.service';
import { Component } from '@angular/core';

@Component({
  selector: 'toaster',
  template: `
    <alert type="success" *ngFor="let toast of toasts" dismissible="true" (onClose)="removeToast(toast)">
      <div class="alert-body">
        <div class="info">
            <div class="heading">{{toast.heading | translate:(toast.headingData || {})}}</div>
            <div *ngIf="toast.body">{{toast.body | translate:(toast.bodyData || {})}}</div>
        </div>
        <button class="btn link app-icon-chevron-right align-icon-right" *ngIf="toast.action" (click)="toast.action.callback()">
            {{toast.action.text | translate:(toast.action.textData || {})}}
        </button>
      </div>
    </alert>
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
