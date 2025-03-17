import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatRightBoxService {
  private readonly http = inject(HttpClient);

  getUserDetails(chatId: string) {
    if (!chatId) {
      throw new Error('Invalid ChatId');
    }

    return this.http.get(
      `${environment.back_end}/profile/user-details?id=${chatId}`,
      {
        withCredentials: true,
      }
    );
  }
}
