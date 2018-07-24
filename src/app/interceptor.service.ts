import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
//import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class InterceptorService implements HttpInterceptor{

  constructor() {}
  

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZ3NsYWIuY29t.01YKWEq5yogIUMCkLw3wCEa_6I8vQvQWWF-XDmj7UpQ'
      }
    });

    console.log(request.headers)

    return next.handle(request);
  }
}