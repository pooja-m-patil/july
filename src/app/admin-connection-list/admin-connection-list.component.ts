import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { DataService } from '../data.service';
import { BaseChartDirective } from "ng2-charts/ng2-charts";
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-connection-list',
  templateUrl: './admin-connection-list.component.html',
  styleUrls: ['./admin-connection-list.component.css']
})
export class AdminConnectionListComponent implements OnInit {

  connList = [];
  latitude: number;
  longitude: number;
  realTimeData = [];
  chartData = [];
  chartLabels = [];
  showMapToAdmin: boolean = false;
  showMapToUser: boolean = false;
  iotDevices = [];
  userRegDevices = [];
  displayDevices = [];
  userData = [];
  deviceObj: object;
  showDataGraph: boolean = false;
  showDevices: boolean = false;
  selectedDevice:any;

  constructor(private http: Http, private dataService: DataService, private user: UserService) { }

  showMap = function (uname, loc, lat, lng, dId) {
    console.log(loc);
    this.showDataGraph = false;
    for (let i = 0; i < this.connList.length; i++) {
      if (loc == this.connList[i].locationname) {
        this.latitude = parseFloat(this.connList[i].latitude);
        this.longitude = parseFloat(this.connList[i].longitude);
      }
    }
    if (this.user.getLog() == 'admin@gslab.com') {
      this.showMapToAdmin = true;
    }
    else if (this.user.getLog() != 'admin@gslab.com') {
      this.showMapToUser = true;
    }
    console.log(this.latitude + " " + this.longitude);


    this.confirmObj = {
      "username": uname,
      "locationname": loc,
      "latitude": lat,
      "longitude": lng,
      "deviceId": dId
    }

    this.showDevices = true;
    this.http.get("http://localhost:3000/display/getIOTDevices").subscribe((res: Response) => {
      var temp = res.json();
    
      for (let i = 0; i < temp.docs.length; i++) {
        this.iotDevices[i] = temp.docs[i]._id;
      }
      
      this.http.get("http://localhost:3000/display/getConfirmedDevices").subscribe((res: Response) => {
  
        var temp = res.json();
        
        for (let i = 0; i < temp.docs.length; i++) {
          this.userRegDevices[i] = temp.docs[i]._id;
        }
        for (let i = 0, j = 0; i < this.iotDevices.length; i++) {
          if (!this.userRegDevices.includes(this.iotDevices[i])) {
            this.displayDevices[j++] = this.iotDevices[i];
          }
        }
      })
    })
  }

  myFunction = function (val) {
    console.log("oninput");
    console.log(val);
    let devID = val.split('/')[val.split('/').length - 1];
    this.value = devID;
  }

  getData = function (dId) {
    console.log(dId);
    this.selectedDevice=dId;

    this.showMapToAdmin = false;
    this.showMapToUser = false;
    this.showDevices = false;
    this.showDataGraph = true;
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

  connectDevice = function (dId) {
    this.confirmObj["devId"] = dId;
    this.http.post("http://localhost:3000/display/editConn", this.confirmObj).subscribe((res: Response) => {
      if (res.ok == true) {
        console.log("delete reg devices");
        this.ngOnInit();
        this.msg = "Device Successfully Registered";
      }
    })
  }

  ngOnInit() {

    this.http.get("http://localhost:3000/display/adminlist").subscribe(res => {
     
      var temp = res.json();
      this.connList = temp.docs;
    });
  }
}
