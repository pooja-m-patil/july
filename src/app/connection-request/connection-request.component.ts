import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../user.service';
import { AgmCoreModule } from '@agm/core';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-connection-request',
  templateUrl: './connection-request.component.html',
  styleUrls: ['./connection-request.component.css']
})
export class ConnectionRequestComponent implements OnInit {

  msg:string;
  coordinates:object;
  rId:number;

  constructor(private http: Http,private user:UserService) { 
    this.latitude = 18.5204;
    this.longitude = 73.8567;
  }
  latitude: number = 18.5204;
  longitude: number = 73.8567;


  reqNewDevice1=function(product)
  {
    console.log(product);
    console.log(product.path[0].firstElementChild.nextElementSibling.attributes[8].nodeValue);
    console.log(product.path[0].firstElementChild.nextElementSibling.attributes[7].nodeValue);
    console.log(product.target.elements[0].value);
    console.log(product.target.elements[0]);
    console.log(product.target.elements);
    console.log("hello");
    //console.log(this.coordinates.coords.lat);
    //console.log(this.coordinates.coords.lng);
    
    // this.productObj={
    // "username":this.user.getWelcome(),
    // "locationname":product.locationname,
    // "latitude":this.coordinates.coords.lat,
    // "longitude":this.coordinates.coords.lng
    // }
  //   this.latitude=this.coordinates.coords.lat;
  //   this.longitude=this.coordinates.coords.lng;
  //   console.log(this.latitude);
  //   console.log(this.longitude);
  //   console.log(this.productObj);
  //   this.http.post("http://localhost:3000/display/reqconn",this.productObj).subscribe((res:Response) => {
    
  //   console.log(res);
  //   var temp=res['_body'];
  //   if(temp=='true'){
  //     this.msg="Request submited successfully";
  //   }
  //   else{
  //     this.msg="Invalid request. Try again";
  //   }
  // })
}

reqNewDevice=function(e){
  console.log(e);
  console.log(e.path[0].firstElementChild.nextElementSibling.attributes[8].nodeValue);
  console.log(e.path[0].firstElementChild.nextElementSibling.attributes[7].nodeValue);
  console.log(e.path[0][3].value);

  this.latitude=e.path[0].firstElementChild.nextElementSibling.attributes[8].nodeValue;
  this.longitude=e.path[0].firstElementChild.nextElementSibling.attributes[7].nodeValue;

  this.productObj={
    "rId":this.rId,
    "username":this.user.getLog(),
    "locationname":e.path[0][3].value,
    "latitude":this.latitude,
    "longitude":this.longitude
    }
   
    console.log(this.latitude);
    console.log(this.longitude);
    console.log(this.productObj);
    this.http.post("http://localhost:3000/display/reqconn",this.productObj).subscribe((res:Response) => {
    
    console.log(res);
    var temp=res['_body'];
    if(temp=='true'){
      this.msg="Request submited successfully";
      this.rId++;
    }
    else{
      this.msg="Invalid request. Try again";
    }
  })

}

Coords=function(e){
  console.log(e);
  this.coordinates=e;
  this.latitude=this.coordinates.coords.lat;
  this.longitude=this.coordinates.coords.lng;
  console.log(this.latitude+" "+this.longitude);
}
  ngOnInit() {
  }

}
