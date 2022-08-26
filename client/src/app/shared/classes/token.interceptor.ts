import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEvent<any>>> {
    if (this.auth.isAuth()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.auth.getToken() as string
        }
      })
    }
    return next.handle(request);
  }
}
