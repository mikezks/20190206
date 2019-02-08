import { TestBed } from '@angular/core/testing';

import { LocalBasketService } from './local-basket.service';

describe('LocalBasketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalBasketService = TestBed.get(LocalBasketService);
    expect(service).toBeTruthy();
  });
});
