import { TestBed } from '@angular/core/testing';

import { SettingNgService } from './setting-ng.service';

describe('SettingNgService', () => {
  let service: SettingNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
