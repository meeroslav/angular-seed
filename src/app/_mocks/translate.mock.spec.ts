import { Pipe } from "@angular/core";
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'translate',
  pure: false // required to update the value when the promise is resolved
})
export class MockedTranslatePipe implements Pipe {
  name: string = 'translate';

  transform(query: string, ...args: any[]): any {
    if (args.length && args[0] !== null && Object.keys(args[0]).length !== 0) {
      return query + JSON.stringify(args[0]);
    }
    return query;
  }
}

export class MockedTranslateService {
  currentLang: string;

  getResponse: Observable<any> = Observable.of(null);

  setDefaultLang() {}
  use() {}
  get() {
    return this.getResponse;
  }
}
