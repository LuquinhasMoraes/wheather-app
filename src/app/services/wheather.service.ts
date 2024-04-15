import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WheatherService {

  url = 'https://api.openweathermap.org/data/2.5/weather?' 
  appid = '5a4b2d457ecbef9eb2a71e480b947604' 
  locations: BehaviorSubject<any> = new BehaviorSubject([])

  constructor(private httpClient: HttpClient) { }

  getLocationByZip(zipcode: string) {
    this.httpClient.get(`${this.url}zip=${zipcode}&appid=${this.appid}`)
    .pipe(take(1))
    .subscribe(locationsConditions => {
      this.setLocationsInLocalStorage(locationsConditions);
      this.locations.next(locationsConditions)
    })
  }

  setLocationsInLocalStorage(locations: any) {
    let locationsInLocalStorage = localStorage.getItem('locations');

    if(!locationsInLocalStorage) {
      localStorage.setItem('locations', JSON.stringify([locations]))
    } else {

      localStorage.setItem('locations', JSON.stringify([...JSON.parse(locationsInLocalStorage), locations]))
    }
  }

  getLocationsInLocalStorage() {
    let locationsInLocalStorage = localStorage.getItem('locations');

    if(!locationsInLocalStorage) {
      return []
    } 
    return JSON.parse(locationsInLocalStorage);
  }

  getLocationsObservable(): Observable<any> {
    return this.locations.asObservable();
  }
}
