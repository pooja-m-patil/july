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

  getData = function (dId) {
    console.log(dId);
    this.selectedDevice=dId;
    this.showModalData=dId;
    this.showModal=false;
    this.showTabOn=false;
    this.showGraph=!this.showGraph;

    this.realTimeData = [];
    this.chartLabels=[];

    this.locObj = {
      location: dId
    }

    this.sub = this.dataService.getDeviceUsage()
      .subscribe(socketdata => {

        for (let i = 0; i < socketdata.length; i++) {
          if (socketdata[i].deviceId == this.selectedDevice) {
            this.chartLabels.push(socketdata[i].timestamp);
            this.realTimeData.push(socketdata[i].currentusage);
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
    this.showModalData="";
    this.showGraph=false;
    this.showTabTo=dId;
    this.showModal=!this.showModal;
  }

  // isCollapsed=function(dId){
  //   this.showModalData=dId;
  //   this.showModal=!this.showModal;
  // }


  ngOnInit() {
    this.dataService.getDeviceUsage()
    .subscribe(devicedata => {
        this.deviceUsage=devicedata;
    })

  }

}
