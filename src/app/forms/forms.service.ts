import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {ISWPlanet} from './form.interface';
import {Observable} from 'rxjs/Observable';
import {ICountable} from '../table/table.service';

@Injectable()
export class FormsService {

  constructor(private http: Http) {
  }

  getAllStarships(page?: number): Observable<ICountable<ISWPlanet>> {
    return this.http.get(`http://swapi.co/api/planets/?page=${page}`).map(this._extractData);
  }

  private _extractData(res: Response) {
    if (res.text()) {
      return res.json();
    }
    return {};
  }
}
