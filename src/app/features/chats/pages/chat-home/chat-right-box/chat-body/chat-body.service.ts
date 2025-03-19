import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ChatMessageModel } from './chat-body.type';

@Injectable({
  providedIn: 'root',
})
export class ChatBodyService {
  constructor(private readonly http: HttpClient) {}

  fetchChats(conversationId: string, page: number) {
    return this.http.get<{ data: ChatMessageModel[] }>(
      `${environment.back_end}/chat/conversation/messages?id=${conversationId}&page=${page}`,
      {
        withCredentials: true,
      }
    );
  }
}
