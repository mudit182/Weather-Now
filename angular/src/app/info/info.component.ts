import { Component, OnInit } from '@angular/core';
import { ApiCityService } from '../services/api-city.service';
import { City } from '../models/city.model';
import { OpenWeatherMapService } from '../services/open-weather-map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  cityInput = '';
  cityCandidates: City[] = [];

  constructor(
    private router: Router,
    private apiCityService: ApiCityService,
    private openWeatherMapService: OpenWeatherMapService
    ) { }

  ngOnInit() {
  }

  findSimilarCities() {
    this.apiCityService.getSimilarCities(this.cityInput).subscribe((cities: City[]) => {
      this.cityCandidates = cities;
      console.log(cities);
    });
    console.log('here');
  }

  getWeatherData(city: City) {
    this.openWeatherMapService.saveNewCityId(city.weathermapId);
    this.router.navigateByUrl('');
  }

}
