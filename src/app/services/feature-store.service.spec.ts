import { TestBed } from '@angular/core/testing';

import { FeatureStore } from './feature-store.service';

describe('FeatureStore', () => {
  let service: FeatureStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
