import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatMessageModel } from '../chat-body/chat-body.type';

@Injectable({
  providedIn: 'root',
})
export class ChatInputDataService {
  private messageSubject = new Subject<ChatMessageModel>();

  message$: Observable<ChatMessageModel> = this.messageSubject.asObservable();

  sendMessage(message: ChatMessageModel) {
    this.messageSubject.next(message);
  }
}
