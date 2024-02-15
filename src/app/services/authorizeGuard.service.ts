import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JWTTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private router: Router, private jwtService: JWTTokenService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.jwtService.getUser()) {
      if (this.jwtService.isTokenExpired()) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
