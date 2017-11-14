import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ISWUser {
  name: string;
  height: string;
  mass: string;
}

export interface ICountable<T> {
  count: number;
  results: T[];
}

@Injectable()
export class TableService {
  constructor(private http: HttpClient) {}

  getAll(page?: number): Observable<any> {
    return this.http.get(`https://swapi.co/api/people/?page=${page}`);
  }
}
