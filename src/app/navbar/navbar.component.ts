import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../model';
import { UserService } from '../user.service';
import { Http, Response, Headers } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  data:object={};
  arraymsg=[];
  public model=new Model();
  username="codedamn";
  msgObj:object={};
  msg:string;
  showDiv:boolean=false;
  self:boolean=false;
  messages=[];
  userData:string;
  disc_msg:string;
  disc_req:string;

  
  stockQuote:number;
  sub: Subscription;

  constructor(private http: Http,private router:Router,private user:UserService, private dataService:DataService) 
  {
   
    this.model.isFetch=false;
  }
 
  changeUsername(ev)
  {
    this.username=ev.target.value;
  }

  graph=function(){
   
    this.router.navigate(['graph']);
  }

  Navigate(value)
  {
    console.log(value);
    this.router.navigate([value]);
  }

  adminSelect(val){
    if(val=='logout')
    {
      this.user.logout();
      this.router.navigate(['/']);
    }
    else if(val=='home')
    {
      this.router.navigate(['dashboard']);
    }
  }

  watson=function(e) {
    e.preventDefault();
    console.log(e);
    this.msg=e.target.elements[0].value;
    this.self=true;
    this.pushData();
    this.msgObj={
      "msg":this.msg
    }
    this.userData="";
    this.http.post('http://localhost:3000/watson/assistants', this.msgObj)
    .subscribe((res:Response) =>{

      console.log(res);
      this.self=false;
      var response=JSON.parse(JSON.stringify(res));
      var temp=response['_body'];
      if(temp=='Error'){
        console.log("Go to Discovery")
       
        this.http.post('http://localhost:3000/watson/discovery', this.msgObj)
          .subscribe((res:Response) =>{
            console.log(res);
            var temp=res.json();
            console.log(temp);
            if(temp.results[0]){
            console.log(temp.results[0].text);
            this.msg='Sorry. Cannot recognize the input. Is this what you wanted to find?';
            this.self=false;
            this.pushData();
            console.log(temp.results[0].highlight);
            var change=temp.results[0].highlight.text.toString();
            //var text = $(content).text();
            //this.msg=change.match('/<{1}\/{0,1}\w+>{1}/');
            this.msg=change.replace(/<[^>]*>/g,'');
            console.log(this.msg);
            this.self=false;
            this.pushData();
            }
            else{
              this.self=false;
              this.msg="Sorry.. Can not recognize. Try again..";
              this.pushData();
            }
        })
      }
      else{
        this.msg=temp;
        this.self=false;
        this.pushData();
        console.log(this.messages);
        console.log(this.messages[0].text);
      }
      
    })
  }

  toggleDiv=function(){
    this.showDiv=!this.showDiv;
  }

  pushData=function(){
    this.messages.push({
      "text":this.msg,
      "self":this.self
    })
  }
  

  ngOnInit() {

   this.user.getCount();

   this.http.get('http://localhost:3000/watson/assistants')
   .subscribe((res:Response) =>{

     console.log(res);
     var temp=JSON.parse(JSON.stringify(res));
     this.msg=temp['_body'];
     console.log(this.msg);
     this.pushData();
     
   })
  }
  ngOnDestroy() {
   
  }
}



  

  

  
