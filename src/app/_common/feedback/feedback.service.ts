export class FeedbackService {
    static delay = 3000;

    toastNotifications: IToastFeedback[];
    modalNotifications: IFeedback[];

    constructor() {
        this.modalNotifications = [];
        this.toastNotifications = [];
    }

    notify(feedback: IFeedback, isModal?: boolean) {
        if (isModal) {
            this.modalNotifications.push(feedback);
        } else {
            let toastFeedback = feedback as IToastFeedback;
            this.toastNotifications.push(toastFeedback);
            toastFeedback.timer = window.setTimeout(() => {
                this.cancel(toastFeedback , false);
            }, FeedbackService.delay);
        }
    }

    cancel(feedback: IToastFeedback, isModal?: boolean) {
        let list: Array<IToastFeedback|IFeedback> = isModal ? this.modalNotifications : this.toastNotifications;
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
 * Feedback iterface
 */
export interface IFeedback {
    heading: string;
    headingData?: Object;
    body?: string;
    bodyData?: Object;
    action?: { text: string, textData?: Object, callback: Function };
}

/**
 * Toast feedback
 */
export interface IToastFeedback extends IFeedback {
    timer?: any;
}
