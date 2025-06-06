import { DestroyRef, Injectable } from '@angular/core';
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

  constructor(private http: HttpClient, private _destroyRef: DestroyRef) {
    const subscription = this.fetchData().subscribe();

    this._destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  fetchData(): Observable<{ data: UserModel }> {
    return this.http
      .get<{ data: UserModel }>(`${environment.back_end}/profile/user`, {
        withCredentials: true,
      })
      .pipe(
        tap((data) => this.dataSubject.next(data.data)),
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
