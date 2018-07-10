import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  description:string = '';
  msg:string;
  regObj:object;

  constructor(private http: Http,private fb: FormBuilder) { 
    this.rForm = fb.group({
      
      // 'name' : [null, Validators.required, Validators.minLength(3)],
    'name' : [null, Validators.compose([Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
    'role' : [null, Validators.compose([Validators.required,Validators.pattern("[a-zA-Z]*")])],
    'pwd' : [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20),Validators.pattern("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})")])],
    'cpwd': ['', [Validators.required]]


      // passwords:fb.group({
      //   'pwd': ['',  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10),Validators.pattern("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})")])],
      //   'cpwd': ['', [Validators.required]],
      // },{validator: this.passwordConfirming})
    },{validator: this.passwordConfirming});
  }

  passwordConfirming=function(c: AbstractControl): { invalid: boolean } {
    if (c.get('pwd').value !== c.get('cpwd').value) {
        return {invalid: true};
    }
  }
  
  register=function(e) {
    // e.preventDefault();
    console.log(e);
   var email=e.name;
   var role=e.role;
   var pass1=e.pwd;
   
   
    //this.model.pwd=e.target.elements[1].value;
    console.log(email);
    console.log(pass1);
   
    

      this.regObj={
        "email":email,
        "role":role,
        "pass1":pass1,
      };
      this.http.post('http://localhost:3000/display/register', this.regObj)
        .subscribe((res:Response) =>{
          console.log(res);
          var temp=res['_body'];
          console.log(temp);
          if(temp){
            this.msg="Account created successfully. You can now login";
          }
          else{
            this.msg="Invalid Entry";
          }
    });
  }
  ngOnInit() {
  }

}
