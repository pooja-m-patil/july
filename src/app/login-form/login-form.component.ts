import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
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
  public model=new Model();
  loginObj:object={};
  
  
  constructor(private router:Router ,private http: Http, private user:UserService) { }

  ngOnInit() {
   
  }
  
  loginUser=function(e) {
    e.preventDefault();
    console.log(e);
    this.model.uname=e.target.elements[0].value;
    this.model.pwd=e.target.elements[1].value;
    this.loginObj={
      "username": this.model.uname,
      "password":this.model.pwd
    }

    
    if(this.model.uname=="admin"){
      this.user.setLog(this.model.uname);
      this.router.navigate(['dashboard']);
    }
    

    this.http.post('http://localhost:3000/display/login', this.loginObj)
        .subscribe((res:Response) =>{
          console.log(res);
          var temp=res['_body'];
          if(temp=='true'){
            console.log(temp);
            console.log(this.model.uname);
            this.user.setLog(this.model.uname);
            this.router.navigate(['dashboard']);
          }
          else{
            console.log("Username or Password incorrect. Please try again");
            this.model.errmsg="Username or Password incorrect. Please try again"
          }
        var temp=res['_body'];
          
        
          console.log("id"+temp);
          
         this.model.message="Welcome "+temp;
          this.model.welmsg=true;
          console.log(temp);   
          
          return res;
        })
  }

  
}
