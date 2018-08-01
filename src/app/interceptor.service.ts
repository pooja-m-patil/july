import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import decode from 'jwt-decode';
import 'rxjs/add/operator/do';
import { Router, NavigationExtras } from '@angular/router';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private user: UserService, private router: Router) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: this.user.getToken()
      }
    });

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.body.token == 'invalid') {
          this.user.removeToken();
          this.user.logout();
          this.router.navigate(["/"]);
        }
      }
    })
  }
}