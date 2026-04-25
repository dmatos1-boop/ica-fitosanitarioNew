import { TestBed } from '@angular/core/testing';

import { Predio } from './predio';

describe('Predio', () => {
  let service: Predio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Predio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
