import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export default class Api {
	private prefix: string = '';
	private headers = new Headers( { 'Content-Type': 'application/json' });

	/**
	 * @param  {Http} privatehttp
	 */
	constructor( private http: Http ) { }

	/**
	 * Get data from backend api
	 * @param  {string} url
	 * @param  {any} options?
	 * @returns Observable
	 */
	get( url: string, options?: any ): Observable<any> {
		let params = Object.assign( { headers: this.headers }, options || {});
		let requestOptions = new RequestOptions( params );

		return this.http.get( this.prefix + url, requestOptions )
			.map( this.extractData )
			.catch( this.handleError );
	}

	/**
	 * Post data to backend api
	 * @param  {string} url
	 * @param  {any} data
	 * @param  {any} options?
	 * @returns Observable
	 */
	post( url: string, data: any, options?: any ): Observable<any> {
		let body = JSON.stringify( data || {});
		let params = Object.assign( { headers: this.headers }, options || {});
		let requestOptions = new RequestOptions( params );

		return this.http.post( this.prefix + url, body, requestOptions )
			.map( this.extractData )
			.catch( this.handleError );
	}

	//////////////////
	// private methods
	//////////////////
	private extractData( res: Response ) {
		let body = res.json();
		return body.data || {};
	}

	private handleError( error: any ) {
		let errMsg = ( error.message ) ? error.message :
			error.status ?
				`${error.status} - ${error.statusText}` :
				'Server error';

		return Observable.throw( errMsg );
	}
}
