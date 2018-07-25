import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { DataService } from '../data.service';
import { BaseChartDirective } from "ng2-charts/ng2-charts";
import { UserService } from '../user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

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
  iotDevices = [];
  userRegDevices = [];
  displayDevices = [];
  userData = [];
  deviceObj: object;
  showDataGraph: boolean = false;
  showDevices: boolean = false;
  selectedDevice: any;
  deviceUsage = [];
  connMsg: string;

  constructor(private http: HttpClient, private dataService: DataService, private user: UserService) { }

  //Show Map and available devices that can be allocated to user.
  showMap = function (uname, loc, lat, lng, dId) {
    this.showDataGraph = false;
    for (let i = 0; i < this.connList.length; i++) {
      if (loc == this.connList[i].locationname) {
        this.latitude = parseFloat(this.connList[i].latitude);
        this.longitude = parseFloat(this.connList[i].longitude);
      }
    }
    this.showMapToAdmin = true;

    this.confirmObj = {
      "username": uname,
      "locationname": loc,
      "latitude": lat,
      "longitude": lng,
      "deviceId": dId
    }

    this.showDevices = true;
    this.http.get("http://localhost:3000/admin-apis/ibm-devices").subscribe((res: Response) => {
      var data = JSON.parse(JSON.stringify(res));

      for (let i = 0; i < data.docs.length; i++) {
        this.iotDevices[i] = data.docs[i]._id;
      }

      this.http.get("http://localhost:3000/admin-apis/connected-devices").subscribe((res: Response) => {

        var temp = JSON.parse(JSON.stringify(res));

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

  //Extracting deviceId from dragged URL.
  myFunction = function (val) {
    let devID = val.split('/')[val.split('/').length - 1];
    this.value = devID;
  }

  //Stop device connection. 
  stopConn = function (deviceId) {
    this.http.put("http://localhost:3000/connections/" + deviceId).subscribe((res: Response) => {
      this.connMsg = JSON.parse(JSON.stringify(res));
    })
  }

  //Restart device connection.
  restartConn = function (deviceId) {
    this.http.get("http://localhost:3000/connections/" + deviceId).subscribe((res: Response) => {
      console.log(res);
      this.connMsg = JSON.parse(JSON.stringify(res));
    })
  }


  //Register user connection with new device.
  connectDevice = function (deviceId) {
    this.confirmObj["devId"] = deviceId;
    this.http.patch("http://localhost:3000/admin-apis/connections", this.confirmObj).subscribe((res: Response) => {
      var temp = JSON.parse(JSON.stringify(res));
      if (res.ok == true) {
        this.ngOnInit();
        this.msg = "Device Successfully Registered";
      }
    })
  }


  ngOnInit() {
    this.connMsg = "";

    this.http.get("http://localhost:3000/admin-apis/connections").subscribe(res => {
      var data = JSON.parse(JSON.stringify(res));
      this.connList = data.docs;
    });
  }
}
