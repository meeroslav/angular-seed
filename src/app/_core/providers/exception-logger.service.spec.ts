import {beforeEachProviders} from '@angular/core/testing';
import { ExceptionLogger } from './exception-logger.service';

describe('ExceptionLogger.Service: ', () => {

    beforeEachProviders(() => [
        ExceptionLogger
    ]);

    it('should create breadcrumbs observable', () => {
        let logger = 0;
        let exlogger = new ExceptionLogger(logger, false);

        expect(exlogger.call).toBeDefined();
    });

    it('should create breadcrumbs observable', () => {
        let logger = 0;
        let exlogger = new ExceptionLogger(logger, false);

        spyOn(console, 'log').and.stub();
        exlogger.call({ 'some': 'error'});
        expect(console.log).toHaveBeenCalledWith('Ng Exception: ', '{"some":"error"}', undefined, undefined );
    });
});
