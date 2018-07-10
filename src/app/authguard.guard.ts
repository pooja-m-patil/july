import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserService} from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthguardGuard implements CanActivate {

  constructor(private user:UserService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    if(this.user.getLog()){
      return true;
    }
    else{
      this.router.navigate([''])
    }
  }
}
