import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-requested-connection',
  templateUrl: './requested-connection.component.html',
  styleUrls: ['./requested-connection.component.css']
})
export class RequestedConnectionComponent implements OnInit {

  connRequests = [];
  deviceObj = [];
  auth: string;
  hideAddedDevice: any;
  deviceId: string;
  userRegDevices = [];
  displayDevices = [];

  constructor(private http: HttpClient, private router: Router, private user: UserService) {}

  addDevice = function (index, username, locationname, latitude, longitude) {
    this.deviceObj = [
      { "username": username }, { "locationname": locationname }, { "latitude": latitude }, { "longitude": longitude }
    ];
    this.user.setMapping(this.deviceObj);
    this.router.navigate(['mapping-devices']);
  }

  ngOnInit() {
    this.http.get("http://localhost:3000/admin-apis/user-connections").subscribe(res => {
      var temp = JSON.parse(JSON.stringify(res));
      this.connRequests = temp.data.docs;
    })
  }
}