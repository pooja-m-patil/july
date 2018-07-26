import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../user.service';
import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connection-request',
  templateUrl: './connection-request.component.html',
  styleUrls: ['./connection-request.component.css']
})
export class ConnectionRequestComponent implements OnInit {

  msg: string;
  coordinates: object;
  rId: number = 1;
  latitude: number = 18.5204;
  longitude: number = 73.8567;


  constructor(private http: HttpClient, private user: UserService) {
    this.latitude = 18.5204;
    this.longitude = 73.8567;
  }
  
  //Request for new device connection by user.
  reqNewDevice = function (e) {

    this.latitude = e.path[0].firstElementChild.nextElementSibling.attributes[8].nodeValue;
    this.longitude = e.path[0].firstElementChild.nextElementSibling.attributes[7].nodeValue;

    this.productObj = {
      "rId": this.rId,
      "username": this.user.getLog(),
      "locationname": e.path[0][3].value,
      "latitude": this.latitude,
      "longitude": this.longitude
    }

    this.http.post("http://localhost:3000/user-apis/connection-requests", this.productObj).subscribe((res: Response) => {
      var temp = JSON.parse(JSON.stringify(res));
      if (temp.data == true) {
        this.msg = "Request submited successfully";
        this.rId++;
      }
      else {
        this.msg = "Invalid request. Try again";
      }
    })

  }

  Coords = function (e) {
    this.coordinates = e;
    this.latitude = this.coordinates.coords.lat;
    this.longitude = this.coordinates.coords.lng;
  }

  ngOnInit() { }

}
