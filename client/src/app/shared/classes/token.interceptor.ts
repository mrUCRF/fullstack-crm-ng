import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {  Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEvent<any>>> {
    if (this.auth.isAuth()) {
      request = request.clone({
        setHeaders: {
          Authorization: this.auth.getToken() as string
        }
      })
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.handleAuthError(err)
      }
      ))
    }


  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if(error.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      })
    }
    return throwError(() => error)
  }
}

