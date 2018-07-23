import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Http, Response, Headers } from '@angular/http';
import { BaseChartDirective } from "ng2-charts/ng2-charts";

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
  chartLabels=[];
  realTimeData=[];
  selectedDevice:any;
  chartData=[];
  showTabTo:string;
  showTabOff:boolean=false;
  showModalData:string;
  showModal:boolean=false;
  showPopUp=false;
  showGraph=false;

  


  constructor(public dataService:DataService,public http:Http) { }

  // stopConn=function(devId){

  //   this.dId={
  //     "devId":devId
  //   }

  //   this.http.post("http://localhost:3000/stop-conn",this.dId).subscribe((res:Response) => {
  //   console.log(res);
  //   this.connMsg=res['_body'];
  // })
    
  // }

  // restartConn=function(deviceId){
  //   this.dId={
  //     "devId":deviceId
  //   }
  //   this.http.post("http://localhost:3000/restart-conn",this.dId).subscribe((res:Response) => {
  //   console.log(res);
  //   this.connMsg=res['_body'];
  // })

  // }

  openModal=function(){
    this.showPopUp=true;

  }



  getData = function (dId) {
    console.log(dId);
    this.selectedDevice=dId;
    this.showModalData=dId;
    this.showModal=false;
    this.showTabOn=false;
    this.showGraph=!this.showGraph;

    // this.showMapToAdmin = false;
    // this.showMapToUser = false;
    // this.showDevices = false;
    // this.showDataGraph = true;
    this.realTimeData = [];
    this.chartLabels=[];

    this.locObj = {
      location: dId
    }

    this.sub = this.dataService.getDeviceUsage()
      .subscribe(socketData => {

        for (let i = 0; i < socketData.length; i++) {
          if (socketData[i].deviceId == this.selectedDevice) {
            this.chartLabels.push(socketData[i].timestamp);
            this.realTimeData.push(socketData[i].currentusage);
            this.chartData = [{ data: this.realTimeData, label: this.selectedDevice }];
          }
        }
        if (this.realTimeData.length == 10 || this.realTimeData.length > 10) {
          this.realTimeData.splice(0, 1);
          this.chartLabels.splice(0, 1);
        }
      })
  }

  showFaAwe=function(dId){
    console.log(this.showModal);
    this.showModalData="";
    this.showGraph=false;
    this.showTabTo=dId;
    this.showModal=!this.showModal;
    console.log(this.showTabOn);
    console.log(this.showModal);
  }

  isCollapsed=function(dId){
    console.log("show modal");
    this.showModalData=dId;
    this.showModal=!this.showModal;
  }


  ngOnInit() {
   // this.connMsg="";
    this.dataService.getDeviceUsage()
    .subscribe(quote => {
        console.log(quote);
        this.deviceUsage=quote;
        console.log(this.deviceUsage);
    })

  }

}
