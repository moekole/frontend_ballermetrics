import { TestBed } from '@angular/core/testing';

import { BallerguardGuard } from './ballerguard.guard';

describe('BallerguardGuard', () => {
  let guard: BallerguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BallerguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
