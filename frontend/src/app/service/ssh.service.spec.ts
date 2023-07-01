import { TestBed } from '@angular/core/testing';

import { SSHService } from './ssh.service';

describe('SSHService', () => {
  let service: SSHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
