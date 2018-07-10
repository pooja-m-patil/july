import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../user.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-connected-devices',
  templateUrl: './connected-devices.component.html',
  styleUrls: ['./connected-devices.component.css']
})
export class ConnectedDevicesComponent implements OnInit {

  userNameObj:object;
  location=[];
  latitude:number;
  longitude:number;
  deviceData=[];
  showMap:boolean;
  locObj:object;
  chartLabels=[];
  realTimeData=[];
  chartData=[];


  constructor(private http: Http, private user:UserService,private dataService: DataService) { }


  showGraph=function(loc){
    console.log(loc);
    for(let i=0;i<this.deviceData.length;i++){
      if(loc==this.deviceData[i].locationname){
        this.latitude=parseFloat(this.deviceData[i].latitude);
        this.longitude=parseFloat(this.deviceData[i].longitude);
      }
    }
    this.showMap=true;
    console.log(this.latitude+" "+this.longitude);
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

  ngOnInit() {

    this.userNameObj={
      "uname":this.user.getLog()
    }

    this.http.post('http://localhost:3000/display/confirmed_devices', this.userNameObj)
        .subscribe((res:Response) =>{

          console.log(res);
          var temp=res.json();
          console.log(temp.docs);

          for(let i=0;i<temp.docs.length;i++){
            this.location[i]=temp.docs[i];
          }
          this.deviceData=temp.docs;

          console.log(this.location);
          console.log(this.deviceData);



        })
  }

}
