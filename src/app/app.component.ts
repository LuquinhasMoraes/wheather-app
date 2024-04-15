import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WheatherService } from './services/wheather.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WheatherMapApp';
  url = 'https://api.openweathermap.org/data/2.5/weather?' 
  zipcode = 95742
  appid = '5a4b2d457ecbef9eb2a71e480b947604' 
  data: any = null;
  input = new FormControl();

  locations: Array<any> = []

  constructor(private wheatherService: WheatherService, private fb: FormBuilder) {

    this.wheatherService.getLocationsObservable()
      .pipe(filter(obs => obs !== undefined && obs !== null))
      .subscribe(locations => this.locations.push(locations))
  }

  ngOnInit(): void {
    this.locations = this.wheatherService.getLocationsInLocalStorage();    
  }

  addLocation() {
    // samples: 95742, 10001, and 33101: 
    let zipcode = this.input.value ?? '';
    this.wheatherService.getLocationByZip(zipcode)
    this.input.setValue('');
  }
}
