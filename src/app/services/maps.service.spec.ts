import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapsService
      ]
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save latitude and longitude', () => {
      // Arrange
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        const response = {
          coords: {
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: 100,
            longitude: -100,
            speed: 0
          },
          timestamp: 0
        }
        successFn(response);
      });
      // Act
      service.getCurrenPosition();

      // Assert
      expect(service.center.latitude).toEqual(100);
      expect(service.center.longitude).toEqual(-100);
    })
  });
});
