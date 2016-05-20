import { Http, Response }   from '@angular/http';
import {Injectable}         from '@angular/core';
import { Observable }       from 'rxjs/Observable';

@Injectable()
export default class LanguageConfig {
    public data: Observable<any>;
    private configUrl = 'app/_common/configs/languages.json';

    constructor(private http: Http) {
        this.data = this.http.get(this.configUrl)
            .map((res: Response) => {
                return res.json();
            });
    }
}
