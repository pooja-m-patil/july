import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connected-devices',
  templateUrl: './connected-devices.component.html',
  styleUrls: ['./connected-devices.component.css']
})
export class ConnectedDevicesComponent implements OnInit {

  userNameObj: object;
  location = [];
  latitude: number;
  longitude: number;
  deviceData = [];
  locObj: object;
  chartLabels = [];
  realTimeData = [];
  chartData = [];


  constructor(private http: HttpClient, private user: UserService, private dataService: DataService) { }

  //Showing exact location of device on map.
  showMap = function (loc) {
    this.showDataGraph = false;
    for (let i = 0; i < this.deviceData.length; i++) {
      if (loc == this.deviceData[i].locationname) {
        this.latitude = parseFloat(this.deviceData[i].latitude);
        this.longitude = parseFloat(this.deviceData[i].longitude);
      }
    }
    this.showMapToUser = true;
  }


  //Showing real time data to user.
  getData = function (dId) {

    this.showMapToUser = false;
    this.showDataGraph = true;
    this.locObj = {
      location: dId
    }
    this.sub = this.dataService.getDeviceUsage()
      .subscribe(devicedata => {

        for (let i = 0; i < devicedata.length; i++) {
          this.chartLabels.push(devicedata[i].timestamp);
          this.realTimeData.push(devicedata[i].currentusage);
        }

        this.chartData = [{ data: this.realTimeData, label: dId }];

        if (this.realTimeData.length == 10 || this.realTimeData.length > 10) {
          this.realTimeData.splice(0, 1);
          this.chartLabels.splice(0, 1);
        }
      })
  }


  ngOnInit() {

    this.userNameObj = {
      "uname": this.user.getLog()
    }

    this.http.get('http://localhost:3000/user-apis/admin-connections/' + this.user.getLog())
      .subscribe((res: Response) => {

        var temp = JSON.parse(JSON.stringify(res));
        for (let i = 0; i < temp.data.docs.length; i++) {
          this.location[i] = temp.data.docs[i];
        }
        this.deviceData = temp.data.docs;
      })
  }
}
