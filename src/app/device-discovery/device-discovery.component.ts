import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { Quote } from '@angular/compiler';

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

  constructor(private http:Http,private dataService: DataService,private user:UserService) {
    //this.remoteDevices=[];
   }

  discdevice=function(id)
  {
    this.productObj=
    {
      "devicename":id
    }
    this.http.post("http://localhost:3000/display/add",this.productObj).subscribe((res:Response) => 
    {
      this.temp=res['_body'];
      this.isAdded=true;
      this.obj=
      {
        "added":this.temp,
        "id":id
      }
      this.http.post("http://localhost:3000/remoteApp",this.obj).subscribe((res:Response) => {
      })
    })
  }

  getDevices=function()
  {
    if(this.remoteDevices.length==0)
    {
      console.log("no dev");
      this.msg="No devices available";
    }
    this.dataService.getQuotes()
    .subscribe(quote => {
      console.log(quote);
      this.flag=0;
      this.showdiv=true;
  
    })
      console.log(this.remoteDevices);
  }

  ngOnInit() {
   
  this.http.get("http://localhost:3000/initarray").subscribe((res:Response) => {
    console.log(res);
    //var temp=res.json();
    //console.log(temp);
    //this.remoteDevices=res
  })

  if(this.remoteDevices.length==0){
    console.log("no dev");
    this.msg="No devices available";
  }
  
  this.sub = this.dataService.getQuotes()
  .subscribe(quote => {
    console.log(quote);
    this.flag=0;
    this.showdiv=true;
   this.remoteDevices=quote.slice(0);
  })
    console.log(this.remoteDevices);
  }

  ngOnDestroy() {
    //clearInterval(this.interval);
    this.user.resetCount();
    //this.sub.unsubscribe();
  }

}