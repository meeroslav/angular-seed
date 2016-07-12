import {Injectable, ExceptionHandler} from '@angular/core';

@Injectable()
export class ExceptionLogger extends ExceptionHandler {

    /**
     * Override for call to exception handler
     * @param  {any} error
     * @param  {any} stackTrace?
     * @param  {string} reason?
     */
    call(error: any, stackTrace?: any, reason?: string) {
        console.log('Ng Exception: ', JSON.stringify(error), stackTrace, reason);
    }
}
