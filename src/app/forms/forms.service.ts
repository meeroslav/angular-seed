import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormsService {

  constructor(private http: HttpClient) {
  }

  getAllStarships(page?: number): Observable<any> {
    return this.http.get(`https://swapi.co/api/planets/?page=${page}`);
  }
}
