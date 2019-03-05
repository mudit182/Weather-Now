import { Component } from '@angular/core';
import { OpenWeatherMapService } from './services/open-weather-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sidebarOpen = false;

  constructor(private openWeatherMapService: OpenWeatherMapService) { }

  getCurrentCityName() {
    return this.openWeatherMapService.getCurrentCityName();
  }
}
