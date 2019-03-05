import { Component, OnInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';

import { OpenWeatherMapService } from '../services/open-weather-map.service';
import { WeatherDataProcessed } from '../models/weather-data-processed.model';


@Component({
  selector: 'app-live-data',
  templateUrl: './live-data.component.html',
  styleUrls: ['./live-data.component.scss']
})
export class LiveDataComponent implements OnInit, OnDestroy {
  fetchInterval: NodeJS.Timer;

  city = '';
  timeFetched: moment.Moment;
  currentData: {type: string, value: any}[];

  constructor(private openWeatherMapService: OpenWeatherMapService) { }

  ngOnInit() {
    this.fetchInterval = setInterval(() => {
      this.getWeatherData();
    }, 10000);
    this.getWeatherData();
  }

  ngOnDestroy() {
    clearInterval(this.fetchInterval);
  }

  getWeatherData() {
    this.openWeatherMapService.getWeatherDataByCityCode().subscribe((weather: WeatherDataProcessed) => {
      this.city = weather.city;
      this.timeFetched = weather.timeFetched;
      this.currentData = weather.data;
    });
  }

}
