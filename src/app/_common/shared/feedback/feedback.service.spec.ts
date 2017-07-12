import { TestBed } from '@angular/core/testing';
import { FeedbackService, IFeedback } from './feedback.service';

describe('Feedback.Service: ', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackService]
    });
  });

  beforeEach(() => {
    service = new FeedbackService();
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterEach(() => {
    service.toasts.forEach((toast: IFeedback) => {
      toast.timer && clearTimeout(toast.timer);
    });
  });

  it('should initialize feedback service', () => {
    expect(service.toasts).toBeDefined();
  });

  it('should add new toast notification with text only and start timer', () => {
    let feedback: IFeedback = {
      heading: 'ABC'
    };
    service.notify(feedback);

    expect(service.toasts.length).toEqual(1);
    expect(service.toasts[0].timer).toBeDefined();
  });

  it('should remove toast after 5000ms', () => {
    let feedback: IFeedback = {
      heading: 'ABC'
    };
    service.notify(feedback);
    jasmine.clock().tick(5000);

    expect(service.toasts.length).toEqual(0);
    expect(feedback.timer).toBeNull();
  });
  it('should remove toast but not stop timer if modified', () => {
    let feedback: IFeedback = {
      heading: 'ABC'
    };
    service.notify(feedback);
    feedback.timer = 0;
    jasmine.clock().tick(5000);

    expect(service.toasts.length).toEqual(0);
    expect(feedback.timer).not.toBeNull();
  });
  it('should remove toast after canceling it', () => {
    let feedback: IFeedback = {
      heading: 'ABC'
    };
    service.notify(feedback);
    service.cancel(feedback);

    expect(service.toasts.length).toEqual(0);
    expect(feedback.timer).toBeNull();
  });
  it('should not remove toast if wrong toast canceled', () => {
    let feedback: IFeedback = {
      heading: 'ABC'
    };
    service.notify(feedback);
    service.cancel({ heading: 'def' });

    expect(service.toasts.length).toEqual(1);
  });
});
