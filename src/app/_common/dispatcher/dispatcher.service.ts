import { Injectable } from '@angular/core';

@Injectable()
export class DispatcherService {
  private static subscriptions: { [eventName: string]: Function[] } = {};

  /**
   * Dispatch event to all listeners
   * @param  {string} eventName
   * @param args
   * @returns void
   */
  static dispatch(eventName: string, ...args: any[]): void {
    if (!eventName || !DispatcherService.subscriptions[eventName] || !DispatcherService.subscriptions[eventName].length) {
      return;
    }
    // run every listener method
    for (let i = 0; i < DispatcherService.subscriptions[eventName].length; i = i + 1) {
      DispatcherService.subscriptions[eventName][i].apply(this, args);
    }
  }

  /**
   * Subscribe callback function to event
   * @param  {string} eventName
   * @param  {Function} func
   * @returns void
   */
  static subscribe(eventName: string, func: Function): void {
    if (!DispatcherService.subscriptions[eventName]) {
      DispatcherService.subscriptions[eventName] = [];
    }
    DispatcherService.subscriptions[eventName].push(func);
  }

  /**
   * Unsubscribe callback function or remove entire eventName if callback not provided
   * @param  {string} eventName
   * @param  {Function} func?
   * @returns void
   */
  static unsubscribe(eventName: string, func?: Function): void {
    if (!func) {
      DispatcherService.subscriptions[eventName] = null;
      return;
    }

    const index = DispatcherService.subscriptions[eventName].indexOf(func);
    if (index !== -1) {
      DispatcherService.subscriptions[eventName].splice(index, 1);
      if (!DispatcherService.subscriptions[eventName].length) {
        DispatcherService.subscriptions[eventName] = null;
      }
    }
  }
}
