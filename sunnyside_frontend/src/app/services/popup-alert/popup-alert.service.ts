import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PopupAlertService {

  private alertSubject = new Subject<string>();
  alert$ = this.alertSubject.asObservable();

  show(message: string) {
    // Append zero-width space to make each message unique
    this.alertSubject.next(message + '\u200B');
  }
}
