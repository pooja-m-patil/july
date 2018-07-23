import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { Http, Response, Headers } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { InterceptorService } from '../interceptor.service'

@Component({
  selector: 'app-fetchdata',
  templateUrl: './fetchdata.component.html',
  styleUrls: ['./fetchdata.component.css']
})
export class FetchdataComponent implements OnInit {
  public model=new Model();
  constructor(private http: Http,private httpClient: HttpClient,private user:UserService,private httpInt:InterceptorService) { }
  
  deleteDevice = function(id) {
    console.log(id);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    let options = new RequestOptions({
      headers: headers,
      body: {
        "name": id
      }
    });
    if(confirm("Are you sure?")) {
      this.http.delete('http://localhost:3000/display/del', options)
      .subscribe((res:Response) =>{
        this.model.isDeleted=true;
        this.model.deleted=id;
        console.log(res);
        this.ngOnInit();
        return res;
      })
    }
}

//Show Auth token..
showAuth=function(device)
  {
      let id = device['deviceId'];
      console.log("id");
      console.log(id);
      this.devObj={
          "name": id
        }
      
        this.http.post('http://localhost:3000/display/datafetch', this.devObj)
        .subscribe((res:Response) =>{
          this.model.Token=id;
          device.authToken =  res['_body'];
          console.log(res);
          return res;
        })
  }

    graph=function(){
      this.router.navigate(['graph']);
    }

  ngOnInit() {

    // let headers = new Headers({
    //   'Authorization': 'Bearer '+this.user.getToken()
    // });

    // let options = new RequestOptions({
    //   headers: headers,
    // });
  
    console.log("uname "+this.model.uname);
    this.httpClient.get("http://localhost:3000/display").subscribe(res=>{
      console.log(res);
        this.model.isFetch=true;
        this.model.devices=res;
        console.log(this.model.devices);
        //return this.devices;
      });
  }
}
