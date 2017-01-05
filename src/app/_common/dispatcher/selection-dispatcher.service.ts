import {Injectable} from '@angular/core';

export type SelectionDispatcherListener = (key: string, value: string) => void;

@Injectable()
export class SelectionDispatcher {
  private _listeners: SelectionDispatcherListener[] = [];

  notify(key: string, value: string) {
    for (let listener of this._listeners) {
      listener(key, value);
    }
  }

  listen(listener: SelectionDispatcherListener) {
    this._listeners.push(listener);
  }
}
