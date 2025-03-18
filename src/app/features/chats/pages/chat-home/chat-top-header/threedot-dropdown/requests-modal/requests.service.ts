import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { Requests } from './requests.types';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private readonly http = inject(HttpClient);

  getRequests() {
    return this.http.get<{data: Requests[]}>(`${environment.back_end}/chat/requests`, {
      withCredentials: true,
    });
  }
}
