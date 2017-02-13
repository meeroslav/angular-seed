export class FeedbackService {
  static delay = 5000;

  toasts: IFeedback[];

  constructor() {
    this.toasts = [];
  }

  notify(feedback: IFeedback) {
    feedback.type = feedback.type || 'info';
    this.toasts.unshift(feedback);
    feedback.timer = window.setTimeout(() => {
      this.cancel(feedback);
    }, FeedbackService.delay);
  }

  cancel(feedback: IFeedback) {
    let list: Array<IFeedback> = this.toasts;
    const index = list.indexOf(feedback);
    if (index !== -1) {
      if (feedback.timer) {
        clearTimeout(feedback.timer);
        feedback.timer = null;
      }
      list.splice(index, 1);
    }
  }
}

/**
 * Feedback interface
 */
export interface IFeedback {
  heading: string;
  headingData?: Object;
  body?: string;
  bodyData?: Object;
  timer?: any;
  action?: { text: string, textData?: Object, callback: Function };
  type?: 'success' | 'info' | 'warning' | 'danger';
}
