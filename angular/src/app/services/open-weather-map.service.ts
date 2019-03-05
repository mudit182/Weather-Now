import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as moment from 'moment';

import { WeatherDataProcessed } from '../models/weather-data-processed.model';


@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {
  weatherApiUrlWithoutCityCode = 'http://api.openweathermap.org/data/2.5/weather?APPID=d369eeb8c928af2d751baa9605856984&id=';
  selectedCityId = 1279233;
  selectedCityName = 'Ahmadabad, IN';

  constructor(private http: HttpClient) { }

  saveNewCityId(id: number) {
    this.selectedCityId = id;
  }

  getCurrentCityName() {
    return this.selectedCityName;
  }

  getWeatherDataByCityCode() {
    const url = this.weatherApiUrlWithoutCityCode + this.selectedCityId.toString();
    return this.http.get(url).pipe(
      map((data: any) => {
        this.selectedCityName = data.name + ', ' +  data.sys.country;
        const weatherData = new WeatherDataProcessed();
        weatherData.city = data.name + ', ' +  data.sys.country;
        weatherData.timeFetched = moment.unix(data.dt);
        weatherData.data = [];
        weatherData.data.push({type: 'Temperature', value: (Math.round(data.main.temp - 273.15)).toString() + ' C'});
        weatherData.data.push({type: 'Pressure', value: (data.main.pressure).toString() + ' hPa'});
        weatherData.data.push({type: 'Humidity', value: (data.main.humidity).toString() + '%'});
        return weatherData;
      }),
      catchError((error: any) => {
        console.log('Error while fetching weather data by city code.');
        return of(new WeatherDataProcessed());
      })
    );
  }
}
