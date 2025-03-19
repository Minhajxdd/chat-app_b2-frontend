import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserModel } from './user.type';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  constructor(private http: HttpClient) {}

  fetchData(): Observable<UserModel> {
    return this.http
      .get<UserModel>('https://api.example.com/data', { withCredentials: true })
      .pipe(
        tap((data) => this.dataSubject.next(data)),
        catchError((error) => {
          console.error('Error fetching data', error);
          return throwError(error);
        })
      );
  }
}
