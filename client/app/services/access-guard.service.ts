import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin) {
      this._authService.checkLoginStatus()
        .subscribe(
          (response: any) => {
            return true;
          },
          (err) => {
            this._router.navigateByUrl('/login');
          },
          () => {
            console.log('User login status check complete.');
          }
        );
      return true;
    }
  }
}
