import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { UserKeys, UserModel } from './user.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserState {
  private dataSubject = new BehaviorSubject<UserModel | null>(null);

  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    const subscription = this.fetchData().subscribe((data) => {
      console.log(data);
      console.log('from user state');
    });
  }

  fetchData(): Observable<UserModel> {
    return this.http
      .get<UserModel>(`${environment.back_end}/profile/user`, {
        withCredentials: true,
      })
      .pipe(
        tap((data) => this.dataSubject.next(data)),
        catchError((error) => {
          console.error('Error fetching data', error);
          return throwError(error);
        })
      );
  }

  getData(type: UserKeys): Observable<string | null> {
    return this.data$.pipe(map((data) => (data ? data[type] : null)));
  }
}
