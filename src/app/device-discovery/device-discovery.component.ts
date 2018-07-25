import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { Quote } from '@angular/compiler';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-device-discovery',
  templateUrl: './device-discovery.component.html',
  styleUrls: ['./device-discovery.component.css']
})
export class DeviceDiscoveryComponent implements OnInit {

  wsdata=[];
  remoteDevices=[];
  sub: Subscription;
  isAdded:boolean=false;
  temp:any
  obj:object;
  flag:number;
  interval: any;
  msg:string;
  showdiv:boolean=false;

  constructor(private http:HttpClient,private dataService: DataService,private user:UserService) {
    //this.remoteDevices=[];
   }

  discdevice=function(id)
  {
    this.deviceObj=
    {
      "devicename":id
    }
    this.http.post("http://localhost:3000/apis/devices",this.deviceObj).subscribe((res:Response) => 
    {
      this.temp=JSON.parse(JSON.stringify(res));
      this.isAdded=true;
      this.deviceObj=
      {
        "added":this.temp,
        "id":id
      }
      this.http.post("http://localhost:3000/devices",this.deviceObj).subscribe((res:Response) => {
      })
    })
  }

  ngOnInit() {

  if(this.remoteDevices.length==0){
    this.msg="No devices available";
  }
  
  this.sub = this.dataService.getAvailableDevices()
  .subscribe(data => {
    //this.flag=0;
    this.remoteDevices=data.slice(0);
    this.showdiv=true;
  })
  }

  ngOnDestroy() {
    //clearInterval(this.interval);
    //this.user.resetCount();
  }

}