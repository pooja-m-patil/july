import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
//import { } from '@types/googlemaps';

@Component({
  selector: 'app-mapping-devices',
  templateUrl: './mapping-devices.component.html',
  styleUrls: ['./mapping-devices.component.css']
})
export class MappingDevicesComponent implements OnInit {

  iotDevices = [];
  userData = [];
  latitude: number;
  longitude: number;
  value: string;
  confirmObj: object;
  msg: string;
  devId: object;
  userRegDevices = [];
  displayDevices = [];

  constructor(private user: UserService, private http: HttpClient) {

  }

  myFunction = function (val) {
    let devID = val.split('/')[val.split('/').length - 1];
    this.value = devID;
  }



  connectDevice = function (dId) {

    this.confirmObj = {
      "username": this.userData[0].username,
      "locationname": this.userData[1].locationname,
      "latitude": this.userData[2].latitude,
      "longitude": this.userData[3].longitude,
      "deviceId": dId
    }

    this.http.post("http://localhost:3000/admin-apis/connections", this.confirmObj).subscribe((res: Response) => {
    var temp=JSON.parse(JSON.stringify(res)); 
    console.log(temp); 
    if (temp.data.ok == true) {
        this.msg = "Device Successfully Registered";

      }
    })
  }

  ngOnInit() {

    this.userData = this.user.getMapping();
    this.latitude = parseFloat(this.userData[2].latitude);
    this.longitude = parseFloat(this.userData[3].longitude);


    this.http.get("http://localhost:3000/admin-apis/ibm-devices").subscribe((res: Response) => {
      var temp = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < temp.data.docs.length; i++) {
        this.iotDevices[i] = temp.data.docs[i]._id;
      }
      this.http.get("http://localhost:3000/admin-apis/connected-devices").subscribe((res: Response) => {
        var temp = JSON.parse(JSON.stringify(res));
        for (let i = 0; i < temp.data.docs.length; i++) {
          this.userRegDevices[i] = temp.data.docs[i]._id;
        }
        for (let i = 0, j = 0; i < this.iotDevices.length; i++) {
          if (!this.userRegDevices.includes(this.iotDevices[i])) {
            this.displayDevices[j++] = this.iotDevices[i];
          }
        }
      })
    })
  }
}
