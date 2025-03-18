import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conversations } from '../pages/chat-home/chat-home.model';

@Injectable({
  providedIn: 'root',
})
export class ChatSelectedConversationService {
  private dataStore = new BehaviorSubject<Conversations | null>(null);

  private conversation$: Observable<Conversations | null> =
    this.dataStore.asObservable();

  setConversation(data: Conversations): void {
    this.dataStore.next(data);
  }

  getConversationObservable(): Observable<Conversations | null> {
    return this.conversation$;
  }

  getCurrentConversation(): Conversations | null {
    return this.dataStore.getValue();
  }
}
