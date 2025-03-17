import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { User } from './search-user.types';

@Injectable({
  providedIn: 'root',
})
export class SearchUserService {
  private readonly _http = inject(HttpClient);
  private readonly _destoryRef = inject(DestroyRef);

  private _searchSubject = new Subject<string>();
  private _dataSubject = new Subject<User[]>();

  constructor() {
    this._searchDebounce();
  }

  private _searchDebounce() {
    const subscription = this._searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => this._searchUsers(searchTerm))
      )
      .subscribe((response) => {
        this._setUserData(response.data);
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private _searchUsers(keyWord: string) {
    return this._http.get<{data: User[]}>(
      `${environment.back_end}/chat/search-users?&name=${keyWord}`,
      {
        withCredentials: true,
      }
    );
  }

  private _setUserData(data: User[]): void {
    this._dataSubject.next(data);
  }

  searchUser(searchTerm: string): void {
    this._searchSubject.next(searchTerm);
  }

  getUsers():Observable<User[]>  {
    return this._dataSubject.asObservable();
  }
}
