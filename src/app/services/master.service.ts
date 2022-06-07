import {Injectable} from '@angular/core';
import {ValueService} from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private value: ValueService) {
  }

  getValue(): string {
    return this.value.getValue();
  }
}
