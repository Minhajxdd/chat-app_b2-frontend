import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchUserService {
  private readonly _http = inject(HttpClient);
  private readonly _destoryRef = inject(DestroyRef);

  private _searchSubject = new Subject<string>();

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
        console.log('searched users');
        console.log(response);
      });

    this._destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private _searchUsers(keyWord: string) {
    return this._http.get(
      `${environment.back_end}/chat/search-users?&name=${keyWord}`,
      {
        withCredentials: true,
      }
    );
  }

  searchUser(searchTerm: string) {
    this._searchSubject.next(searchTerm);
  }
}
