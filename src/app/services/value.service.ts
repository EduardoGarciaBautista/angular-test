import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  private value = 'my value';

  constructor() {
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  gerPromiseValue(): Promise<string> {
    return Promise.resolve('promise value');
  }

  getObservableValue(): Observable<string> {
    return of('observable value');
  }
}
