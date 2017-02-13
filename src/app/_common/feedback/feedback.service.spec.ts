import {TestBed} from '@angular/core/testing';
import { FeedbackService, IFeedback, IToastFeedback } from './feedback.service';

describe('Feedback.Service: ', () => {
    let service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers:[FeedbackService]
        });
    });

    beforeEach(() => {
        service = new FeedbackService();
        jasmine.clock().uninstall();
        jasmine.clock().install();
    });

    afterEach(() => {
        service.toasts.forEach((toast: IToastFeedback) => {
            toast.timer && clearTimeout(toast.timer);
        });
    });

    it('should initialize feedback service', () => {
        expect(service.toasts).toBeDefined();
    });

    it('should add new toast notification with text only and start timer', () => {
        var feedback: IFeedback = {
            heading: 'ABC'
        };
        service.notify(feedback);

        expect(service.toasts.length).toEqual(1);
        expect(service.toasts[0].timer).toBeDefined();
    });
    it('should add new modal notification', () => {
        var feedback: IFeedback = {
            heading: 'ABC'
        };
        service.notify(feedback, true);

        expect(service.modalNotifications.length).toEqual(1);
    });

    it('should remove toast after 3000ms', () => {
        var feedback: IToastFeedback = {
            heading: 'ABC'
        };
        service.notify(feedback);
        jasmine.clock().tick(3000);

        expect(service.toasts.length).toEqual(0);
        expect(feedback.timer).toBeNull();
    });
    it('should remove toast but not stop timer if modified', () => {
        var feedback: IToastFeedback = {
            heading: 'ABC'
        };
        service.notify(feedback);
        feedback.timer = 0;
        jasmine.clock().tick(3000);

        expect(service.toasts.length).toEqual(0);
        expect(feedback.timer).not.toBeNull();
    });
    it('should remove toast after canceling it', () => {
        var feedback: IToastFeedback = {
            heading: 'ABC'
        };
        service.notify(feedback);
        service.cancel(feedback);

        expect(service.toasts.length).toEqual(0);
        expect(feedback.timer).toBeNull();
    });
    it('should remove modal after canceling it', () => {
        var feedback: IFeedback = {
            heading: 'ABC'
        };
        service.notify(feedback, true);
        service.cancel(feedback, true);

        expect(service.modalNotifications.length).toEqual(0);
    });
    it('should not remove toast if wrong toast canceled', () => {
        var feedback: IToastFeedback = {
            heading: 'ABC'
        };
        service.notify(feedback);
        service.cancel({heading: 'def'});

        expect(service.toasts.length).toEqual(1);
    });
    it('should rnot emove modal if wrong toast canceled', () => {
        var feedback: IFeedback = {
            heading: 'ABC'
        };
        service.notify(feedback, true);
        service.cancel({heading: 'def'}, true);

        expect(service.modalNotifications.length).toEqual(1);
    });
});
