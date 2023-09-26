import { TestBed } from '@angular/core/testing';

import { reservationAreaService } from './reservation-area.service';

describe('ReservationAreaService', () => {
  let service: reservationAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(reservationAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
