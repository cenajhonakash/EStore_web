import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { storeManagerGuardGuard } from './store-manager-guard.guard';

describe('storeManagerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => storeManagerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
