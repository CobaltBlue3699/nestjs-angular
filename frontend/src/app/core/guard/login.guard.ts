import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.guard(route);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.guard(route);
  }

  guard(route: ActivatedRouteSnapshot | Route): Observable<boolean> {
    const neededLogin = !(route.data?.neededLogin === false);
    return this.userService
      .getUser()
      .pipe(
        map(user => {
          if (neededLogin === !!user) {
            return true;
          } else if (neededLogin) { // 需要登入
            this.router.navigateByUrl('/login');
            return false;
          } else { // 不需登入
            this.router.navigateByUrl('/dashboard');
            return false;
          }
        })
      );
  }

}
