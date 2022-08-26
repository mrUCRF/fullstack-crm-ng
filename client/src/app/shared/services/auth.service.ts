import { User } from './../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NonNullAssert } from '@angular/compiler';
import { relativeTimeThreshold } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: null | string = null

login(user: User): Observable<{token: string}> {
return this.httpClient.post<{token: string}>('/api/auth/login', user)
.pipe( //принимает операторы и по цепочке их выполняет
tap(({token}) => { //позволяет выцепить чтото со стрима
  localStorage.setItem('auth-token', token)
  this.setToken(token)
})
)
}
setToken(token:string | null) {
  this.token = token
}
getToken(): string | null {
  return this.token
}
isAuth(): boolean {
return !!this.token
}
logout() {
  this.setToken(null)
  localStorage.clear()
}
register(user: User): Observable<User> {
return this.httpClient.post<User>('api/auth/register', user)
}
  constructor(private httpClient: HttpClient) { }
}
