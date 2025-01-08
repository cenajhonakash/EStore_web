import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { storeManagementGuardGuard } from './store-management-guard.guard';

describe('storeManagementGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => storeManagementGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
