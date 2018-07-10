import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-retrivedata',
  templateUrl: './retrivedata.component.html',
  styleUrls: ['./retrivedata.component.css']
})
export class RetrivedataComponent implements OnInit {
  isdbdata:boolean=false;   
  devObj:object={};
  constructor(private http: Http) { }
  private headers=new Headers({'content-Type':'application/json'});

  // DbData=function(devData){
  //   console.log(devData.name);
  //   this.devObj={
  //     "name":devData.name
  //   }
  //   console.log(this.devObj);
  //   this.http.get("http://localhost:3000/datafetch",this.devObj,{}).subscribe((res:Response)=>{
  //   console.log(res);
  //   });
  //   console.log("retriveee");
  // }


  DbData = function(id) {
    if (this.isdbdata==false) {
      this.isdbdata=true;
      return;
    }
    console.log("id");
    console.log(id.name);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    this.devObj={
        "name": id.name
      }
    //console.log(options.body.name);
      this.http.get('http://localhost:3000/display/datafetch', this.devObj,{headers:headers})
      .subscribe((res:Response) =>{
        console.log("response");
        return res;
      })
}

  ngOnInit() {
  }

}
