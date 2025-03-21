import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Conversations } from './chat-conversations-listings.model';

@Injectable({
  providedIn: 'root',
})
export class ChatConversationsListingsService {
  private readonly http = inject(HttpClient);

  getConversations() {
    return this.http.get<{data: Conversations[]}>(`${environment.back_end}/chat/conversation`, {
      withCredentials: true,
    });
  }
}
