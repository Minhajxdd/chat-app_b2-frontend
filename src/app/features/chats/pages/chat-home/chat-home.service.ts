import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Conversations} from './chat-home.model';

@Injectable({
  providedIn: 'root',
})
export class ChatHomeService {
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<{data: Conversations[]}>(`${environment.back_end}/chat/conversation`, {
      withCredentials: true,
    });
  }
}
