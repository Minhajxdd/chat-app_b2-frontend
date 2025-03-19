import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatInputDataModel } from './chat-input.model';

@Injectable({
  providedIn: 'root',
})
export class ChatInputDataService {
  private messageSubject = new Subject<ChatInputDataModel>();

  message$: Observable<ChatInputDataModel> = this.messageSubject.asObservable();

  sendMessage(message: ChatInputDataModel) {
    this.messageSubject.next(message);
  }
}
