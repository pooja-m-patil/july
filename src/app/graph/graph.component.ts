import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BaseChartDirective } from "ng2-charts/ng2-charts";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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

  dropdownCityList = [];
  selectedCityItems = [];
  dropdownCitySettings = {};

  dropdownAreaList = [];
  selectedAreaItems = [];
  dropdownAreaSettings = {};
  myarray: number[][] = new Array;

  constructor(private http: Http) {

  }

  mapping = function () {
    this.ref = [];
    this.map = [];
    this.selectedAreaItems = [];
    this.http.get("http://localhost:3000/display/mapping").subscribe(res => {
      var temp1 = res.json();
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
      console.log(this.dropdownAreaList);

      //   this.dropdownAreaSettings = {
      //     singleSelection: false,
      //     idField: 'item_id',
      //     textField: 'item_text',
      //     selectAllText: 'Select All',
      //     unSelectAllText: 'UnSelect All',
      //     itemsShowLimit: 3,
      //     allowSearchFilter: true
      // };
    })
  }


  graph = function (e) {
    this.status = 0;
    this.chartData2 = [];
    this.chartLabels = [];
    this.date = [];

    console.log(e);
    var d1 = new Date(e.d1);
    var d2 = new Date(e.d2);
    console.log(typeof (d1));
    this.date1 = d1.toISOString();
    this.date2 = d2.toISOString();

    console.log(this.date1);
    console.log(this.date2)

    var m1 = d1.getMonth();
    console.log(m1);
    var m2 = d1.getMonth();
    console.log(m2);

    for (let n = 0; n < 30; n++) {
      this.myarray[n] = new Array(4);
    }

    for (let a = 0; a < this.selectedAreaItems.length; a++) {
      
        this.monthDate = {
          "d1": this.date1,
          "d2": this.date2,
          "dId": this.selectedAreaItems[a]
        }
      

      this.http.post("http://localhost:3000/display/graph", this.monthDate).subscribe(res => {

        console.log(res);
        var temp = res.json();
        console.log(temp);
        var t;

        for (t = 0; t < temp.length; t++) {
          this.date[t] = temp[t].timestamp;

          for (let l = 0; l < temp.length; l++) {
            this.myarray[a][l] = temp[l].usage;
          }
        }
        console.log(this.date)
        console.log(this.myarray[a]);
        this.chartData2.push({ data: this.myarray[a], label: this.selectedAreaItems[a] });
        this.status++;
        console.log(this.selectedAreaItems.length);
        console.log(this.status);
      })
    }
    console.log(this.myarray);
  }


  ngOnInit() {
    this.selectedCityItems = [];

    this.http.get("http://localhost:3000/display/cities").subscribe(res => {
      var temp = res.json();
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

