import {Injectable, ExceptionHandler} from '@angular/core';

@Injectable()
export default class ExceptionLogger extends ExceptionHandler {

	call(error: any, stackTrace?: any, reason?: string) {
		console.log('Ng Exception: ', error.toString());
	}
}