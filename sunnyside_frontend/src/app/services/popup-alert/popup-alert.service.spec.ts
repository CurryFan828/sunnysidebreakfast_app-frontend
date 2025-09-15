import { TestBed } from '@angular/core/testing';
import { PopupAlertService } from './popup-alert.service';

describe('PopupAlert', () => {
  let service: PopupAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
