import {beforeEachProviders} from '@angular/core/testing';
import { LoadingIndicatorService } from './loading-indicator.service';

describe('LoadingIndicator.Service: ', () => {
    let service;

    beforeEachProviders(() => [
        LoadingIndicatorService
    ]);

    beforeEach(() => {
        service = new LoadingIndicatorService();
        jasmine.clock().uninstall();
        jasmine.clock().install();
    });

    it('should initialize loading indicator service', () => {
        expect(service.status).toBeDefined();
        expect(service.status.isInProgress).toBeFalsy();
    });

    it('should start indicator with 250ms delay', () => {
        service.start();

        expect(service.status.isInProgress).toBeFalsy();
        jasmine.clock().tick(250);
        expect(service.status.isInProgress).toBeTruthy();
    });

    it('should switch off indicator after done', () => {
        service.start();

        jasmine.clock().tick(250);
        expect(service.status.isInProgress).toBeTruthy();

        service.done();
        expect(service.status.isInProgress).toBeFalsy();
    });

    it('should keep indicator started if toggled more times than switched off', () => {
        service.start();
        service.start();
        service.start();

        jasmine.clock().tick(250);
        expect(service.status.isInProgress).toBeTruthy();

        service.done();
        service.done();
        expect(service.status.isInProgress).toBeTruthy();

        // cleanup
        service.done();
    });

    it('should ignore manual tempering with indicator status', () => {
        service.status.isInProgress = true;
        service.done();
        service.done();
        expect(service.status.isInProgress).toBeTruthy();
    });

});
