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

    this.http.get('http://localhost:3000/apis/token/' + id)
      .subscribe(res => {
        console.log(res);
        this.model.Token = id;
        device.authToken = res;
        console.log(res);
        return res;
      })
  }


  graph = function () {
    this.router.navigate(['graph']);
  }

  ngOnInit() {

    this.http.get("http://localhost:3000/apis/devices").subscribe(res => {
      var temp=JSON.parse(JSON.stringify(res));
      console.log(temp);
      this.model.isFetch = true;
      this.deviceData = temp.data;
    });

  }
}
