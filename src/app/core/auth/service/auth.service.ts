import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, switchMap, tap } from 'rxjs';

import { jwtDecode, JwtPayload } from 'jwt-decode';

import { JwtStructure } from '../models/auth.models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly destroyRef = inject(DestroyRef);

    refreshAccessToken() {
        return this.http
            .post<{ access_token: string }>(
                `${environment.back_end}/auth/refresh`,
                {},
                { withCredentials: true }
            )
            .pipe(
                tap((response) => {
                    this.getCookie('access_token');
                }),
                switchMap((response) => of(response.access_token))
            );
    }

    getCookie(name: string): string | null {
        const match = document.cookie.match(
            new RegExp('(^| )' + name + '=([^;]+)')
        );
        return match ? decodeURIComponent(match[2]) : null;
    }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigate(['login']);

        // const subscription = this.http
        //     .post(
        //         `${environment.back_end}/auth/logout`,
        //         {},
        //         { withCredentials: true }
        //     )
        //     .subscribe({
        //         complete: () => {
        //             this.router.navigate(['login']);
        //         },
        //     });

        // this.destroyRef.onDestroy(() => {
        //     subscription.unsubscribe();
        // });
    }

    private getDecodedAccessToken(token: string) {
        try {
            return jwtDecode<JwtStructure>(token);
        } catch (err) {
            return null;
        }
    }

    userInProject(projectId: any) {
        let accesstToken = this.getCookie('access_token');
        if (accesstToken) {
            return this.getDecodedAccessToken(accesstToken);
        }
        return null;
    }

    whatIsRole() {
        const accessToken = this.getCookie('access_token');
        if (accessToken) {
            return this.getDecodedAccessToken(accessToken)?.isAdmin;
        }
        return null;
    }

    isUser(): boolean {
        const token = localStorage.getItem("access_token");

        if (token) {
            return !this.getDecodedAccessToken(token)?.isAdmin;
        }
        return false;
    }

    isAdmin(): boolean {
        const accessToken = this.getCookie('access_token');
        if (accessToken) {
            const data = this.getDecodedAccessToken(accessToken)?.isAdmin;

            if (data)
                return data;
            else
                return false;
        }

        return false;
    }
}
