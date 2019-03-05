import { TestBed } from '@angular/core/testing';

import { ApiCityService } from './api-city.service';

describe('ApiCityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCityService = TestBed.get(ApiCityService);
    expect(service).toBeTruthy();
  });
});
