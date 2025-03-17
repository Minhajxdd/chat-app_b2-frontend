import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenChatButtonService {
  private readonly _http = inject(HttpClient);

  checkForConversation(otherUserId: string) {
    return this._http.post<{ data: any[] }>(
      `${environment.back_end}/chat/find-conversation`,
      {
        otherUserId,
      },
      {
        withCredentials: true,
      }
    );
  }
}
