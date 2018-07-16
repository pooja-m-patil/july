import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-device-usage',
  templateUrl: './device-usage.component.html',
  styleUrls: ['./device-usage.component.css']
})
export class DeviceUsageComponent implements OnInit {

  deviceUsage=[];
  dUsage=[];
  dId:object;
  allowDevice=[];
  connMsg:string;
  btnDisplay=[];

  constructor(public dataService:DataService,public http:Http) { }

  stopConn=function(devId){

    this.dId={
      "devId":devId
    }

    this.http.post("http://localhost:3000/stop-conn",this.dId).subscribe((res:Response) => {
    console.log(res);
    this.connMsg=res['_body'];
  })
    
  }

  restartConn=function(deviceId){
    this.dId={
      "devId":deviceId
    }
    this.http.post("http://localhost:3000/restart-conn",this.dId).subscribe((res:Response) => {
    console.log(res);
    this.connMsg=res['_body'];
  })

  }

  ngOnInit() {
    this.connMsg="";
    this.dataService.getDeviceUsage()
    .subscribe(quote => {
        console.log(quote);
        this.deviceUsage=quote;
        console.log(this.deviceUsage);
        for(let i=0;i<this.deviceUsage.length;i++){
          if(this.deviceUsage[i].status=="Stopped"){
            this.btnDisplay[i]="Stopped";
          }
        }
    })

  }

}
