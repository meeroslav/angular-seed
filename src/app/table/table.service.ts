import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

export interface ISWUser {
  name: string,
  height: string,
  mass: string
}

export interface ICountable<T> {
  count: number,
  results: T[]
}

@Injectable()
export class TableService {
  constructor(private http: Http) {}

  getAll(page?: number): Observable<ICountable<ISWUser>> {
    return this.http.get(`http://swapi.co/api/people/?page=${page}`).map(this._extractData);
  }

  private _extractData(res: Response) {
    if (res.text()) {
      return res.json();
    }
    return {};
  }
}
