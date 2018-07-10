import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Http, Response, Headers } from '@angular/http';
//import { } from '@types/googlemaps';

@Component({
  selector: 'app-mapping-devices',
  templateUrl: './mapping-devices.component.html',
  styleUrls: ['./mapping-devices.component.css']
})
export class MappingDevicesComponent implements OnInit {

  iotDevices=[];
  userData=[];
  latitude:number;
  longitude:number;
  value:string;
  confirmObj:object;
  msg:string;
  devId:object;
  userRegDevices=[];
  displayDevices=[];

  constructor(private user:UserService,private http: Http) {
    console.log(this.user.getMapping());
    
   }

   myFunction=function(val){
     console.log("oninput");
     console.log(val);
    let devID = val.split('/')[val.split('/').length-1];
    this.value = devID;
    }

    

  connectDevice=function(dId){
    console.log("connect");
    console.log(dId);

    this.confirmObj={
      "username":this.userData[0].username,
      "locationname":this.userData[1].locationname,
      "latitude":this.userData[2].latitude,
      "longitude":this.userData[3].longitude,
      "deviceId":dId
    }

    this.http.post("http://localhost:3000/display/confirmReq",this.confirmObj).subscribe((res:Response) => 
    {
        console.log(res);
        console.log(res.ok);
        if(res.ok==true){
          console.log("delete reg devices");
          this.msg="Device Successfully Registered";

        }
    })
     
  }       



  ngOnInit() {

    this.userData=this.user.getMapping();
    //console.log(this.userData[0].username);
    this.latitude=parseFloat(this.userData[2].latitude);
    this.longitude=parseFloat(this.userData[3].longitude);
    console.log(this.latitude);
    console.log(this.longitude);
    
    this.http.get("http://localhost:3000/display/getIOTDevices").subscribe((res:Response) => 
      {
        console.log(res);
        var temp=res.json();
        console.log(temp);
        console.log(temp.docs[0]._id);
        // this.iotDevices
        for(let i=0;i<temp.docs.length;i++){
          this.iotDevices[i]=temp.docs[i]._id;
        }
        console.log(this.iotDevices);
        this.http.get("http://localhost:3000/display/getConfirmedDevices").subscribe((res:Response) => 
        {
          console.log(res);
          var temp=res.json();
          console.log(temp.docs);
          for(let i=0;i<temp.docs.length;i++){
              this.userRegDevices[i]=temp.docs[i]._id;
            }
          console.log(this.userRegDevices);
          for(let i=0,j=0;i<this.iotDevices.length;i++){
            if(!this.userRegDevices.includes(this.iotDevices[i])){
              this.displayDevices[j++]=this.iotDevices[i];
            }
          }
          console.log(this.displayDevices);
        })
      })
  }

}
