import { TestBed } from '@angular/core/testing';

import { PoemadbService } from './poemadbservice.service';

describe('PoemadbserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoemadbService = TestBed.get(PoemadbService);
    expect(service).toBeTruthy();
  });
});
