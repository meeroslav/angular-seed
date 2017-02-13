import { By } from '@angular/platform-browser';
import { TestBed} from '@angular/core/testing';
import { MockedTranslatePipe } from '../../../_core/mocks/translate.mock.spec';
import { ToasterComponent } from './toaster.component';

import { FeedbackService, IFeedback } from './feedback.service';

class MockedFeedbackService {
    toastNotifications: Array<IFeedback>;

    constructor() {
        this.toastNotifications = [];
    }
    cancel() { /**/ }
}

describe('Toaster.Component',
    () => {
        var fixture;
        var service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [ToasterComponent, MockedTranslatePipe],
                providers: [
                    { provide: FeedbackService, useClass: MockedFeedbackService }
                ]
            });

            fixture = TestBed.createComponent(ToasterComponent);
            service = TestBed.get(FeedbackService);
        });

        it('should initialize toasts from service and add removeToast method', () => {

            let component = new ToasterComponent(service);

            expect(component.toasts).toEqual([], 'toasts should be equal to service toasts');
            expect(component.removeToast).toBeDefined('should define removeToast method');
        });

        it('should update toasts from service', () => {

            let component = new ToasterComponent(service);
            let testText = 'some text';

            service.toasts.push({ heading: testText });

            expect(component.toasts).toEqual([{ heading: testText }], 'toasts should be equal to service toasts');
        });

        it('should call cancel on service when removeToast', () => {

            let component = new ToasterComponent(service);
            let testText = 'some text';
            spyOn(service, 'cancel').and.stub();

            component.removeToast({ heading: testText });

            expect(service.cancel).toHaveBeenCalledWith({ heading: testText });
        });

        it('should create the component', () => {

            expect(fixture.componentInstance instanceof ToasterComponent).toBe(true, 'should create ToasterComponent');
        });

        it('should not show toast items if none defined', () => {
            let indicator = fixture.debugElement.query(By.css('.feedback-item'));
            expect(indicator).toBeNull();
        });

        it('should show toast items if defined', () => {
            let testText = 'some text';
            service.toasts.push({ heading: testText });
            fixture.detectChanges();

            let indicator = fixture.debugElement.query(By.css('.feedback-item'));

            expect(indicator.query(By.css('.feedback-heading')).nativeElement.innerHTML)
                .toEqual(testText);
        });
    });
