import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-requested-connection',
  templateUrl: './requested-connection.component.html',
  styleUrls: ['./requested-connection.component.css']
})
export class RequestedConnectionComponent implements OnInit {

  connRequests=[];
  deviceObj=[];
  auth:string;
  hideAddedDevice:any;
  deviceId:string;
  userRegDevices=[];
  displayDevices=[];

  constructor(private http: Http,private router:Router,private user:UserService) { 

  }

  addDevice=function(index,username,locationname,latitude,longitude){
    
    console.log(username);
    console.log(locationname);
    console.log(latitude);
    console.log(longitude);
    
    this.deviceObj=[
      {"username":username},{"locationname":locationname},{"latitude":latitude},{"longitude":longitude}
    ];
    this.user.setMapping(this.deviceObj);
    this.router.navigate(['mapping-devices']);
  //   this.http.post("http://localhost:3000/display/addReq",this.deviceObj).subscribe((res:Response) => 
  //   {
  //     console.log(res.json());
  //     var temp=res.json();
  //     console.log(temp.results[0].deviceId);
  //     this.auth=temp;
  //     this.hideAddedDevice=index;
  //     console.log(this.hideAddedDevice);
  //     for(let i=0;i<this.connRequests.length;i++){
  //       console.log(this.connRequests[i]._id);
  //       if(this.hideAddedDevice==this.connRequests[i]._id){
  //         this.connRequests.splice(i);
  //       }
  //     }
  //   })
  }

  ngOnInit() {
    this.http.get("http://localhost:3000/display/requested_conn").subscribe(res=>{
      console.log(res);
      var temp=res.json();
      console.log(temp);
      console.log(temp.docs);
      this.connRequests=temp.docs;
      console.log(this.hideAddedDevice);
      
      console.log(this.connRequests);
  })

}
}