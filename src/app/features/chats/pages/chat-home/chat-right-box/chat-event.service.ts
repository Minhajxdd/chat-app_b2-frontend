import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatEventService {
  private scrollToTopSubject = new Subject<void>();

  scrollToTop$ = this.scrollToTopSubject.asObservable();

  emitScrollToTop() {
    this.scrollToTopSubject.next();
  }
}
