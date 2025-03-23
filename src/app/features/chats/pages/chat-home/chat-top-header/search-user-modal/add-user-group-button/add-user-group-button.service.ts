import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddUserGroupButtonService {
  constructor(private readonly _http: HttpClient) {}

  checkForConversation(otherUserId: string, conversationId: string) {
    return this._http.post<{ data: any[] }>(
      `${environment.back_end}/chat/group/find-conversation`,
      {
        otherUserId,
        conversationId
      },
      {
        withCredentials: true,
      }
    );
  }

  requestConversation(otherUserId: string, conversationId: string) {
    return this._http.post(
      `${environment.back_end}/chat/group/request-conversation`,
      {
        otherUserId,
        conversationId
      },
      {
        withCredentials: true,
      }
    );
  }
}
