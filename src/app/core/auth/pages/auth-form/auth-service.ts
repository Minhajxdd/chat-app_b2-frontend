import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataModel, RegisterResponseModel } from './auth-form.model';
import { environment } from '../../../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  private readonly http = inject(HttpClient);

  register(userData: DataModel) {
    return this.http
      .post<{ accessToken: string }>(
        environment.back_end + '/auth/register',
        userData,
        {
          withCredentials: true,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  login(userData: DataModel) {
    return this.http
      .post<{ accessToken: string }>(
        `${environment.back_end}/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  }
}
