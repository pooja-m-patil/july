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
  showMapToAdmin:boolean=false;
  showMapToUser:boolean=false;
  iotDevices=[];
  userRegDevices=[];
  displayDevices=[];
  userData=[];

  constructor(private http: Http, private dataService: DataService,private user:UserService) { }

  showGraph = function (uname,loc,lat,lng,dId) {
    console.log(loc);
    for (let i = 0; i < this.connList.length; i++) {
      if (loc == this.connList[i].locationname) {
        this.latitude = parseFloat(this.connList[i].latitude);
        this.longitude = parseFloat(this.connList[i].longitude);
      }
    }
    if(this.user.getLog()=='admin')
    {
      this.showMapToAdmin = true;
    }
    else if(this.user.getLog()!='admin')
    {
      this.showMapToUser = true;
    }
    console.log(this.latitude + " " + this.longitude);


    this.confirmObj={
      "username":uname,
      "locationname":loc,
      "latitude":lat,
      "longitude":lng,
      "deviceId":dId
    }
  }

  myFunction=function(val){
    console.log("oninput");
    console.log(val);
   let devID = val.split('/')[val.split('/').length-1];
   this.value = devID;
   }

  getData = function (dId) {
    console.log(dId);

    this.locObj={
      location:dId
    }

    this.http.post("http://localhost:3000/real-time-data",this.locObj).subscribe(res => {
      console.log(res);
    })

    this.sub = this.dataService.getDeviceData()
      .subscribe(quote => {
        console.log(quote);
        this.chartLabels.push(quote.time);
        this.realTimeData.push(quote.usage);
        console.log(quote.time);
        console.log(this.realTimeData);
        this.chartData = [{ data: this.realTimeData, label: dId }];

        if (this.realTimeData.length == 10 || this.realTimeData.length > 10) {
          this.realTimeData.splice(0,1);
          this.chartLabels.splice(0,1);
        }
      })
  }

  connectDevice=function(dId){
    console.log("connect");
    console.log(dId);

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

    this.http.get("http://localhost:3000/display/adminlist").subscribe(res => {

      console.log(res);
      var temp = res.json();
      console.log(temp.docs);
      this.connList = temp.docs;
      console.log(this.connList);
    });

    // this.userData=this.user.getMapping();
    // console.log(this.userData[0].username);
    // this.latitude=parseFloat(this.userData[2].latitude);
    // this.longitude=parseFloat(this.userData[3].longitude);
    // console.log(this.latitude);
    // console.log(this.longitude);
    
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
