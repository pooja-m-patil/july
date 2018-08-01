import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { Http, Response, Headers } from '@angular/http';
import { RequestOptions, Request, RequestMethod } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { InterceptorService } from '../interceptor.service'

@Component({
  selector: 'app-fetchdata',
  templateUrl: './fetchdata.component.html',
  styleUrls: ['./fetchdata.component.css']
})
export class FetchdataComponent implements OnInit {
  public model = new Model();
  deviceData=[];
  errMsg:string;
  
  constructor(private http: HttpClient, private user: UserService) { }

  //Delete device from IBM IOT platform
  deleteDevice = function (id) {
    if (confirm("Are you sure?")) {
      this.http.delete('http://localhost:3000/apis/devices/' + id)
        .subscribe((res: Response) => {
          this.model.isDeleted = true;
          this.model.deleted = id;
          this.ngOnInit();
          return res;
        })
    }
  }

  //Show Auth token..
  showAuth = function (device) {
    let id = device['deviceId'];
    this.http.get('http://localhost:3000/apis/auth-tokens/' + id)
      .subscribe(res => {
        this.model.Token = id;
        device.authToken = res.data.docs[0].data.authToken;
        return res;
      })
  }

  ngOnInit() {
    this.http.get("http://localhost:3000/apis/devices").subscribe(res => {
      console.log(res);
      var temp=JSON.parse(JSON.stringify(res));
      console.log(temp);
     if(temp.Error){
       this.errMsg=temp.Error;
       console.log("Error");
     }
     else{
      var deviceInfo=JSON.parse(temp.data);
      this.model.isFetch = true;
      this.deviceData = deviceInfo.results
     }
    });
  }
}
