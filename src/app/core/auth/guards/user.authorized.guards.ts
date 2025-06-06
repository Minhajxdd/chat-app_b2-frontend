import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthorizedGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isAuthenticated = this.authService.isUser();

    if (!isAuthenticated) {
      try {
        // await this.authService.refreshAccessToken().toPromise();

        isAuthenticated = this.authService.isUser();

        if (!isAuthenticated) {
          this.router.navigate(['login']);
          return false;
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        this.router.navigate(['login']);
        return false;
      }
    }

    return true;
  }
}
