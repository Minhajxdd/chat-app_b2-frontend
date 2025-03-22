import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateGroupModalService {
  constructor(private readonly http: HttpClient) {}

  createGroup(title: string, description: string) {
    const payload = {
      title,
      description,
    };
    return this.http
      .post(`${environment.back_end}/chat/group`, payload, {
        withCredentials: true,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }
}
