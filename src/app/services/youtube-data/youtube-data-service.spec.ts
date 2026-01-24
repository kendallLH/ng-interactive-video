import { TestBed } from '@angular/core/testing';

import { YoutubeDataService } from './youtube-data-service';

describe('Youtube', () => {
  let service: YoutubeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
