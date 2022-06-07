import {MasterService} from './master.service';
import {ValueService} from './value.service';
import {TestBed} from '@angular/core/testing';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        {provide: ValueService, useValue: spy}
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should create service', function() {
    expect(masterService).toBeTruthy();
  });

  /*it('should return "my value" from rea service', () => {
   let valueService = new ValueService();
   let masterService = new MasterService(valueService);
   expect(masterService.getValue()).toEqual('my value');
   });


   it('should return "fake value" from fake service', () => {
   let fakeValue = new ValueFakeService();
   let masterService = new MasterService(fakeValue as unknown as ValueService);
   expect(masterService.getValue()).toEqual('fake value');
   });

   it('should return "fake value" from fake object', () => {
   let fakeValue = {
   getValue: () => 'fake object',
   };
   let masterService = new MasterService(fakeValue as ValueService);
   expect(masterService.getValue()).toEqual('fake object');
   });*/


  it('should call getValue from valueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value');
    expect(masterService.getValue()).toEqual('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
  });

});
