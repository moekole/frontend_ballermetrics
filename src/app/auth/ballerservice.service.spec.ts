import { TestBed } from '@angular/core/testing';

import { BallerserviceService } from './ballerservice.service';

describe('BallerserviceService', () => {
  let service: BallerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
