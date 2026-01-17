import { TestBed } from '@angular/core/testing';

import { YoutubeDataApi } from './youtube-data-api';

describe('Youtube', () => {
  let service: YoutubeDataApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeDataApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
