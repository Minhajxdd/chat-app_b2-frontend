import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
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
            .post<RegisterResponseModel>(
                environment.back_end + '/auth/register',
                userData,
                {
                    withCredentials: true,
                    observe: 'response',
                }
            )
            .pipe(
                tap((data) => {
                    const headers = data.headers.get('Pragma')?.split(',');

                    headers?.forEach((val) => {
                        document.cookie = val;
                    })
                    
                }),
                catchError((err: HttpErrorResponse) => {
                    return throwError(() => err.error.message);
                })
            );
    }

    login(userData: DataModel) {

        return this.http
            .post<HttpResponse<any>>(
                `${environment.back_end}/auth/login`,
                userData,
                {
                    withCredentials: true,
                    observe: 'response'
                }
            )
            .pipe(
                tap((data) => {
                    const headers = data.headers.get('Pragma')?.split(',');

                    headers?.forEach((val) => {
                        document.cookie = val;
                    })
                    
                }),
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
