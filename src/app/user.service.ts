import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;
  private ishide;
  private key = '';
  private count;
  private showCount = false;
  public uname = '';
  private lname = '';
  private lat = '';
  private lng = '';
  private mapObj = [];

  constructor(private router: Router) {
    this.isUserLoggedIn = false;
    this.key = '';
    this.username = 'admin';
    this.count = 0;

    


  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;

  }

  getuserLoggedin() {
    return this.isUserLoggedIn;

  }

  setLog(uname) {
    //this.isUserLoggedIn=true;
    localStorage.setItem('uname', uname);
  }

  getLog() {
    //return this.isUserLoggedIn;
    return localStorage.getItem('uname');
  }

  logout() {
    //return this.isUserLoggedIn;
    console.log("logout");
    return localStorage.removeItem('uname');

  } 

  setToken(token) {
    //this.isUserLoggedIn=true;
    localStorage.setItem('token',token);
  }

  getToken() {
    //return this.isUserLoggedIn;
    return localStorage.getItem('token');
  }

  removeToken() {
    //return this.isUserLoggedIn;
    console.log("logout");
    return localStorage.removeItem('token');

  } 


  setHideFetch() {
    this.ishide = false;
  }

  getHideFetch() {
    return this.ishide;
  }

  // setWelcome(uname) {
  //   localStorage.setItem(this.username, uname);
  // }

  // getWelcome() {
  //   return localStorage.getItem(this.username);
  // }

  setCount() {
    this.count++;
  }

  getCount() {
    return this.count;
  }

  resetCount() {
    this.showCount = false;
    this.count = 0;
  }

  settingCount() {
    this.showCount = true;
  }

  setMapping(obj) {
    this.mapObj = obj;
  }

  getMapping() {
    return this.mapObj;

  }

  returnCount() {
    return this.showCount;
  }

}
