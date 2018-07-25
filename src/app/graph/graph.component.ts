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
    this.http.get("http://localhost:3000/apis/mapping").subscribe(res => {
      var temp1 = JSON.parse(JSON.stringify(res));
      console.log(temp1);
      for (let i = 0, c = 0, m = 0; i < 4; i++) {
        var dbcity = temp1.docs[i].city;
        for (let j = 0; j < this.selectedCityItems.length; j++) {
          if (this.selectedCityItems[j] == dbcity) {
            console.log("db")
            this.iscity = true;
            this.ref[c] = temp1.docs[i]._id;
            c++;
            this.map[m] = temp1.docs[i].mapid;
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

      console.log(this.selectedAreaItems[a]);
      console.log(a);
      
        this.monthDate = {
          "d1": this.date1,
          "d2": this.date2,
          "dId": this.selectedAreaItems[a]
        }

      this.http.get("http://localhost:3000/apis/graph/"+this.selectedAreaItems[a]+"?date1="+this.date1+"&date2="+this.date2).subscribe(res => {

        console.log(res);
        this.totalLength++;
        var temp = JSON.parse(JSON.stringify(res));
        console.log(temp);
        var j=0,t;

        
        this.dbData[this.dbFetch++]=temp;
              
        if(this.date.length){
          var len=this.date.length+temp.length;
          for(let i=this.date.length;i<len;i++){
            this.date[i]=temp[j].timestamp;
            j++;
          }
        }
        else{
          for (t = 0; t < temp.length; t++) {
            this.date[t] = temp[t].timestamp;
          }

        }

        

        this.date.sort();

        console.log(this.date);
        console.log(this.totalLength);
        console.log(this.selectedAreaItems.length);
        if(this.totalLength==this.selectedAreaItems.length){

          console.log(this.dbData[0][0]);
          console.log(this.dbData);
          console.log(this.date);
          
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
            console.log(this.myarray[b]);
            this.chartData2.push({ data: this.myarray[b], label: this.graphLabel[b] });
            this.status++;
            
            console.log(this.selectedAreaItems.length);
            console.log(this.status);
          }
          console.log(this.dbData);
          console.log(this.myarray);
        }
      })
     
    }
  }    

    //     for (t = 0; t < temp.length; t++) {
    //       this.date[t] = temp[t].timestamp;

    //       for (let l = 0; l < temp.length; l++) {
    //         this.myarray[a][l] = temp[l].usage;
    //       }
    //     }
    //     console.log(this.date)
    //     console.log(this.myarray[a]);
    //     this.chartData2.push({ data: this.myarray[a], label: this.selectedAreaItems[a] });
    //     this.status++;
    //     console.log(this.selectedAreaItems.length);
    //     console.log(this.status);
    //   })
    // }
    // console.log(this.myarray);
      


  ngOnInit() {
    this.selectedCityItems = [];

    this.http.get("http://localhost:3000/apis/cities").subscribe(res => {
      var temp = JSON.parse(JSON.stringify(res));
      console.log(temp);
      for (let i = 0; i < 3; i++) {
        this.arrcity[i] = temp.rows[i].doc.city;
      }
      console.log(this.dropdownCityList);
      this.dropdownCityList = this.arrcity
    })

    this.dropdownCitySettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onCitySelect(item) {

    console.log(item);
    console.log("select" + this.selectedCityItems);
    console.log("items selected" + item);
    this.mapping();
  }

  onCitySelectAll(items) {
    console.log(items);
  }

  onCityDeSelectAll(items) {
    console.log(items);

  }

  onAreaSelect(item) {

    console.log(item);
    console.log(this.selectedAreaItems);
    console.log("items selected" + item);
    this.status = 0;
  }
  onAreaDeSelect(item) {

    console.log("Deselect" + item);
    console.log(this.selectedAreaItems);
    this.status = 0;
    console.log(this.status);
    console.log(this.selectedAreaItems.length);
  }

  onAreaSelectAll(items) {
    console.log(items);
  }

  onAreaDeSelectAll(items) {
    console.log(items);

  }

}

