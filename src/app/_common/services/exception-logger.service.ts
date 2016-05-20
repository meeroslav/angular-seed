import {Injectable, ExceptionHandler} from '@angular/core';

@Injectable()
export default class ExceptionLogger extends ExceptionHandler {

    /**
     * Override for call to exception handler
     * @param  {any} error
     * @param  {any} stackTrace?
     * @param  {string} reason?
     */
    call(error: any, stackTrace?: any, reason?: string) {
        console.log('Ng Exception: ', error.toString(), stackTrace, reason);
    }
}
