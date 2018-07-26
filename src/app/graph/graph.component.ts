import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, Jsonp } from '@angular/http';
import { BaseChartDirective } from "ng2-charts/ng2-charts";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { empty } from 'rxjs/Observer';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  ref = [];
  status: number = 0;
  chartLabels = [];
  arrcity = [];
  date = [];
  map = [];
  chartData2 = [];
  isshow: boolean = false;
  selectedArea = [];
  date1: number;
  date2: number;
  monthDate: object;
  dt: number = 0;
  date12: object;
  totalLength:number=0;
  dbFetch:number=0;

  dropdownCityList = [];
  selectedCityItems = [];
  dropdownCitySettings = {};

  dropdownAreaList = [];
  selectedAreaItems = [];
  dropdownAreaSettings = {};
  myarray: number[][] = new Array;
  dbData=[];
  graphLabel=[];

  constructor(private http: HttpClient) {

  }

  mapping = function () {
    this.ref = [];
    this.map = [];
    this.selectedAreaItems = [];
    this.http.get("http://localhost:3000/apis/mappings").subscribe(res => {
      var temp1 = JSON.parse(JSON.stringify(res));
      console.log(temp1);
      for (let i = 0, c = 0, m = 0; i < 4; i++) {
        var dbcity = temp1.data.docs[i].city;
        for (let j = 0; j < this.selectedCityItems.length; j++) {
          if (this.selectedCityItems[j] == dbcity) {
            console.log("db")
            this.iscity = true;
            this.ref[c] = temp1.data.docs[i]._id;
            c++;
            this.map[m] = temp1.data.docs[i].mapid;
            m++;
          }
        }
      }
      this.dropdownAreaList = this.ref;
    })
  }


  graph = function (e) {
    this.dbFetch=0;
    this.totalLength=0;
    this.status = 0;
    this.chartData2 = [];
    this.chartLabels = [];
    this.date = [];
    this.myarray = new Array;
    this.dbData=[];

    console.log(e);
    var d11 = new Date(e.d1);
    var d22 = new Date(e.d2);
   
    this.date1 = d11.toISOString();
    this.date2 = d22.toISOString();

    console.log(this.selectedAreaItems);

    for (let n = 0; n < this.selectedAreaItems.length; n++) {
      this.myarray[n] = new Array(4);
    }

    for (let a = 0; a < this.selectedAreaItems.length; a++) {

      this.http.get("http://localhost:3000/apis/graphs/"+this.selectedAreaItems[a]+"?date1="+this.date1+"&date2="+this.date2).subscribe(res => {

        this.totalLength++;
        var temp = JSON.parse(JSON.stringify(res));
        var j=0,t;

        
        this.dbData[this.dbFetch++]=temp.data;
              
        if(this.date.length){
          var len=this.date.length+temp.data.length;
          for(let i=this.date.length;i<len;i++){
            this.date[i]=temp.data[j].timestamp;
            j++;
          }
        }
        else{
          for (t = 0; t < temp.data.length; t++) {
            this.date[t] = temp.data[t].timestamp;
          }

        }

        this.date.sort();
        if(this.totalLength==this.selectedAreaItems.length){

            for(let b=0;b<this.dbData.length;b++){

              this.graphLabel[b]=this.dbData[b][0].deviceId;
              for(let k=0;k<this.dbData[b].length;k++){
                for(let i=0;i<this.date.length;i++)
                {
                  if(this.date[i]==this.dbData[b][k].timestamp)
                  {
                    this.myarray[b][i] = this.dbData[b][k].usage;
                  }
                }
            }
            this.chartData2.push({ data: this.myarray[b], label: this.graphLabel[b] });
            this.status++;
            
          }
        }
      })
     
    }
  }    

  ngOnInit() {
    this.selectedCityItems = [];

    this.http.get("http://localhost:3000/apis/cities").subscribe(res => {
      var temp = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < 3; i++) {
        this.arrcity[i] = temp.data.rows[i].doc.city;
      }
      this.dropdownCityList = this.arrcity
    })

    // this.dropdownCitySettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
  }

  onCitySelect(item) {
    this.mapping();
  }

  onCitySelectAll(items) {}

  onCityDeSelectAll(items) {}

  onAreaSelect(item) {
    this.status = 0;
  }

  onAreaDeSelect(item) {
    this.status = 0;
  }

  onAreaSelectAll(items) {}

  onAreaDeSelectAll(items) {}

}

