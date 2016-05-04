import 'reflect-metadata';
import {Injectable} from '@angular/core';

@Injectable()
export default class Dispatcher {
	private static subscriptions: { [eventName: string]: Function[] } = {};

	// dispatch event to listeners
	// definition has to be function to allow variable number of arguments
	public static dispatch = function(eventName: string, ...args: any[]): void {
		if (!eventName || !Dispatcher.subscriptions[eventName] || !Dispatcher.subscriptions[eventName].length) {
			return;
		}
		// run every listener method
		for (var i = 0; i < Dispatcher.subscriptions[eventName].length; i = i + 1) {
			Dispatcher.subscriptions[eventName][i].apply(this, args);
		}
	};

	// subscribe callback to eventName
	public static subscribe = (eventName: string, func: Function): void => {
		if (!Dispatcher.subscriptions[eventName]) {
			Dispatcher.subscriptions[eventName] = [];
		}
		Dispatcher.subscriptions[eventName].push(func);
	};

	// unsubscribe
	public static unsubscribe = (eventName: string, func?: Function): void => {
		if (!func) {
			Dispatcher.subscriptions[eventName] = null;
			return;
		}

		var index = Dispatcher.subscriptions[eventName].indexOf(func);
		if (index !== -1) {
			Dispatcher.subscriptions[eventName].splice(index, 1);
			if (!Dispatcher.subscriptions[eventName].length) {
				Dispatcher.subscriptions[eventName] = null;
			}
		}
	};
}
