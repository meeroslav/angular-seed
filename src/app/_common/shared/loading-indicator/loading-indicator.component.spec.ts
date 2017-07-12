import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from './loading-indicator.component';
import { LoadingIndicatorService } from './loading-indicator.service';

class MockedLoadingIndicatorService {
    status: any;

    constructor() {
        this.status = {
            isInProgress: false
        };
    }
}

let fixture, service;

describe('LoadingIndicator.Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoadingIndicatorComponent],
            providers: [
                { provide: LoadingIndicatorService, useClass: MockedLoadingIndicatorService }
            ]
        });

        fixture = TestBed.createComponent(LoadingIndicatorComponent);
        service = fixture.debugElement.injector.get(LoadingIndicatorService);
    });

    it('should set loading indicator status', () => {

        var component = new LoadingIndicatorComponent(service);
        expect(component.indicatorStatus.isInProgress).toEqual(false);
    });

    it('should update loading indicator status from service', () => {

        var component = new LoadingIndicatorComponent(service);
        service.status.isInProgress = true;
        expect(component.indicatorStatus.isInProgress).toEqual(true);
    });

    it('should create the component', () => {

        expect(fixture.componentInstance instanceof LoadingIndicatorComponent).toBe(true, 'should create LoadingIndicatorComponent');
    });

    it('should not show indicator if service is not started', () => {

        let indicator = fixture.debugElement.query(By.css('#loading-indicator'));
        expect(indicator).toBeNull();
    });

    it('should show indicator if service is started', () => {

        service.status.isInProgress = true;

        fixture.detectChanges();
        let indicator = fixture.debugElement.query(By.css('#loading-indicator'));
        expect(indicator.nativeElement).toBeDefined();
    });
});
