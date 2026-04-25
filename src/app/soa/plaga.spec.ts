import { TestBed } from '@angular/core/testing';

import { Plaga } from './plaga';

describe('Plaga', () => {
  let service: Plaga;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Plaga);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
