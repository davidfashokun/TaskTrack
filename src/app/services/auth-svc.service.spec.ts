import { TestBed } from '@angular/core/testing';

import { AuthSvcService } from './auth-svc.service';

describe('AuthSvcService', () => {
  let service: AuthSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
