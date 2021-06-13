import { TestBed } from '@angular/core/testing';

import { WikiNgService } from './wiki-ng.service';

describe('WikiNgService', () => {
  let service: WikiNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
