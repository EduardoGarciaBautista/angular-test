import {TestBed} from '@angular/core/testing';
import {ValueService} from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValueService
      ]
    });
    service = TestBed.inject(ValueService);
  });

  it('should create obj', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toEqual('my value');
    });
  });


  describe('Test for setValue', () => {
    it('should return "changed"', () => {
      expect(service.getValue()).toEqual('my value');
      service.setValue('changed');

      expect(service.getValue()).toEqual('changed');
    });
  });

  describe('Test for gerPromiseValues', () => {
    it('should return "promise value" with then', (doneFn) => {
      service.gerPromiseValue().then(r => {
        expect(r).toEqual('promise value');
        // to tell where test is finished
        doneFn();
      });
    });


    it('should return "promise value" with async', async () => {
      const rta = await service.gerPromiseValue();
      expect(rta).toEqual('promise value');
    });
  });

  describe('Test for getObservableValue', () => {
    it('should return "observable value" with subscribe', (doneFn) => {
      service.getObservableValue().subscribe(r => {
        expect(r).toEqual('observable value');
        doneFn();
      });
    });

    it('should return "observable value" with async', async () => {
      const result = await service.getObservableValue().toPromise();
      expect(result).toEqual('observable value');
    });
  });

});
