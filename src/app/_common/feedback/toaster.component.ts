import { FeedbackService, IToastFeedback } from './feedback.service';
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
                <div class="feedback-link app-icon-chevron" *ngIf="toast.action" (click)="toast.action.callback()">
                    {{toast.action.text | translate:(toast.action.textData || {})}}
                </div>
                <div class="feedback-close app-icon-close" (click)="removeToast(toast)"></div>
            </div>
        </div>
    `,
    styles: [`
        @keyframes FeedbackItemAnimation {
            0% {
                -ms-transform: scaleY(0) translateY(50%);
                -webkit-transform: scaleY(0) translateY(50%);
                transform: scaleY(0) translateY(50%);
            }
            100% {
                -ms-transform: scaleY(1) translateY(0%);
                -webkit-transform: scaleY(1) translateY(0%);
                transform: scaleY(1) translateY(0%);
            }
        }
        .feedback-item {
            animation: FeedbackItemAnimation 250ms;
        }
    `]
})
export class ToasterComponent {
    toasts: Array<IToastFeedback>;

    constructor(private feedbackService: FeedbackService) {
        this.toasts = this.feedbackService.toastNotifications;
    }

    removeToast(toast: IToastFeedback) {
        this.feedbackService.cancel(toast);
    }
}
