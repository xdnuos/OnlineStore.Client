import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwtToken = this.authService.getToken();
    const tokenWithoutQuotes =
      jwtToken && jwtToken.startsWith('"') && jwtToken.endsWith('"')
        ? jwtToken.slice(1, -1)
        : jwtToken;
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${tokenWithoutQuotes}`,
      },
    });
    return next.handle(req);
  }
}
