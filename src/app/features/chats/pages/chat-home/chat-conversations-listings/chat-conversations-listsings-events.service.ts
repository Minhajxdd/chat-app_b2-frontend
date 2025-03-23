import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatConversationsListingsEventsService {
  private eventSubject = new Subject<any>();

  event$ = this.eventSubject.asObservable();

  emitEvent(data: any): void {
    this.eventSubject.next(data);
  }
}
