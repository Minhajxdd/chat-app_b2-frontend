import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Users } from './chat-home.model';

@Injectable({
  providedIn: 'root',
})
export class ChatHomeService {
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<{data: Users[]}>(`${environment.back_end}/profile/users`, {
      withCredentials: true,
    });
  }
}
