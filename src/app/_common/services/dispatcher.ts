import 'reflect-metadata';
import {Injectable} from '@angular/core';

export {Dispatcher, IDispatcher}

interface IDispatcher {
	dispatch(eventName: string, ...args: any[]): void;
	subscribe(eventName: string, func: Function): void;
	unsubscribe(eventName: string, func?: Function): void;
}

@Injectable()
class Dispatcher {
	private subscriptions: { [eventName: string]: Function[] };

	constructor() {
		this.subscriptions = {};
	}

	// dispatch event to listeners
	// definition has to be function to allow variable number of arguments
	public dispatch = function(eventName: string, ...args: any[]): void {
		if (!eventName || !this.subscriptions[eventName] || !this.subscriptions[eventName].length) {
			return;
		}
		// run every listener method
		for (var i = 0; i < this.subscriptions[eventName].length; i = i + 1) {
			this.subscriptions[eventName][i].apply(this, args);
		}
	};

	// subscribe callback to eventName
	public subscribe = (eventName: string, func: Function): void => {
		if (!this.subscriptions[eventName]) {
			this.subscriptions[eventName] = [];
		}
		this.subscriptions[eventName].push(func);
	};

	// unsubscribe
	public unsubscribe = (eventName: string, func?: Function): void => {
		if (!func) {
			this.subscriptions[eventName] = null;
			return;
		}

		var index = this.subscriptions[eventName].indexOf(func);
		if (index !== -1) {
			this.subscriptions[eventName].splice(index, 1);
			if (!this.subscriptions[eventName].length) {
				this.subscriptions[eventName] = null;
			}
		}
	};
}
