import { TestBed } from '@angular/core/testing';

import { NetworkinterceptorService } from './networkinterceptor.service';

describe('NetworkinterceptorService', () => {
  let service: NetworkinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
