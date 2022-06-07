import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  public center = {
    latitude: 0,
    longitude: 0
  }
  constructor() { }

  public getCurrenPosition(): void {
    navigator.geolocation.getCurrentPosition((result) => {
      const {latitude, longitude} = result.coords;
      this.center = {
        latitude,
        longitude
      }
    });
  }
}
