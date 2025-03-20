import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ChatMessageModel } from './chat-body.type';

@Injectable({
  providedIn: 'root',
})
export class ChatBodyService {
  constructor(private readonly http: HttpClient) {}

  fetchChats(conversationId: string, lastMessageId: string | null = null) {
    let url = `${environment.back_end}/chat/conversation/messages?id=${conversationId}`;

    if (lastMessageId) {
      url += `&lastMessageId=${lastMessageId}`;
    }

    return this.http.get<{ data: ChatMessageModel[] }>(url, {
      withCredentials: true,
    });
  }
}
