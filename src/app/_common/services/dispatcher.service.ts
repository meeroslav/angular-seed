import 'reflect-metadata';
import {Injectable} from '@angular/core';

@Injectable()
export default class Dispatcher {
    private static subscriptions: { [eventName: string]: Function[] } = {};

    /**
     * Dispatch event to all listeners
     * @param  {string} eventName
     * @param  {any[]} ...args
     * @returns void
     */
    public static dispatch(eventName: string, ...args: any[]): void {
        if (!eventName || !Dispatcher.subscriptions[eventName] || !Dispatcher.subscriptions[eventName].length) {
            return;
        }
        // run every listener method
        for (var i = 0; i < Dispatcher.subscriptions[eventName].length; i = i + 1) {
            Dispatcher.subscriptions[eventName][i].apply(this, args);
        }
    };

    /**
     * Subscribe callback function to event
     * @param  {string} eventName
     * @param  {Function} func
     * @returns void
     */
    public static subscribe(eventName: string, func: Function): void {
        if (!Dispatcher.subscriptions[eventName]) {
            Dispatcher.subscriptions[eventName] = [];
        }
        Dispatcher.subscriptions[eventName].push(func);
    };

    /**
     * Unsubscribe callback function or remove entire eventName if callback not provided
     * @param  {string} eventName
     * @param  {Function} func?
     * @returns void
     */
    public static unsubscribe(eventName: string, func?: Function): void {
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
