import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCityService {
  getSimilarCitiesUrl = 'http://127.0.0.1:8000/api/similar-cities/';

  constructor(private http: HttpClient) { }

  getSimilarCities(city: string) {

    const url = this.getSimilarCitiesUrl + city + '/get';
    return this.http.get(url).pipe(
      map((data: any) => {
        return data.cities;
      }),
      catchError((error: any) => {
        console.log('Error while fetching similar cities.');
        return of([]);
      })
    );
  }
}
