import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Http, Response, Headers } from '@angular/http';
import { Model } from '../model';
import { empty } from 'rxjs/Observer';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public model = new Model();
  loginObj: object = {};


  constructor(private router: Router, private http: Http, private user: UserService) { }

  ngOnInit() {}

  loginUser = function (e) {
    e.preventDefault();
    this.model.uname = e.target.elements[0].value;
    this.model.pwd = e.target.elements[1].value;
    this.loginObj = {
      "username": this.model.uname,
      "password": this.model.pwd
    }

    this.http.post('http://localhost:3000/logs/login', this.loginObj)
      .subscribe((res: Response) => {
        var temp = res.json();

        this.user.setToken(temp.token);
        if (temp.username == "admin@gslab.com") {
          this.user.setLog(this.model.uname);
          this.router.navigate(['dashboard']);
        }
        else if (temp.token) {
          this.user.setLog(this.model.uname);
          this.router.navigate(['dashboard']);
        }
        else {
          this.model.errmsg = "Username or Password incorrect. Please try again"
        }
        var temp = res['_body'];

        this.model.message = "Welcome " + temp;
        this.model.welmsg = true;

        return res;
      })
  }


}
