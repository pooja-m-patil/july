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
  
    ref=[];
    status:number=0;
    chartLabels=[];
    arrcity=[];
    date=[];
    map=[];
    chartData2=[];
    isshow:boolean=false;
    selectedArea=[];
    date1:number;
    date2:number;

    dropdownCityList = [];
    selectedCityItems = [];
    dropdownCitySettings = {};

    dropdownAreaList = [];
    selectedAreaItems = [];
    dropdownAreaSettings = {};
    myarray:number[][]=new Array;
    
    constructor(private http: Http) { 
      
    }
    



   mapping=function()
   {
     this.ref=[];
     this.map=[];
     this.selectedAreaItems=[];
      this.http.get("http://localhost:3000/display/mapping").subscribe(res=>{
        var temp1=res.json();
        console.log(temp1);
        for(let i=0,c=0,m=0;i<4;i++)
        {
          var dbcity=temp1.docs[i].city;
          for(let j=0;j<this.selectedCityItems.length;j++){
          if(this.selectedCityItems[j]==dbcity)
          {
            console.log("db")
            this.iscity=true;
            this.ref[c]=temp1.docs[i]._id;
            c++;
            this.map[m]=temp1.docs[i].mapid;
            m++;
          }
        }
        }
        //console.log("ref"+this.ref);
        //console.log(this.map);
        this.dropdownAreaList=this.ref;
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
  

  graph=function(e)
  {
    this.status=0;
    this.chartData2=[];
    this.chartLabels=[];
    this.date=[];
    

    console.log(e);
    var d1=new Date(e.d1);
    var d2=new Date(e.d2);
    this.date1=d1.getDate();
    this.date2=d2.getDate();
   
    var m=d1.getMonth();
    console.log(m);
    
    for(let d=0,d1=this.date1;d1<=this.date2;d1++)
    {
      this.date[d]=d1;
      d++;
    }

    for(let a=0;a<this.date.length;a++)
    {
      this.myarray[a]=new Array(4);
    }

     for(let a=0;a<this.selectedAreaItems.length;a++)
     {
      
      this.month=
      {
        "m":m+1,
        "array":this.selectedAreaItems[a]
      }

      this.http.post("http://localhost:3000/display/graph",this.month).subscribe(res=>{
        
        var temp=res.json();
        console.log(temp);
        for(let l=0;l<temp.length;l++)
        {
          var tempvar=temp[l].timestamp;
          console.log(tempvar);
          var dbTStamp=new Date(tempvar);
          console.log(dbTStamp);
          // var time=dbTStamp.getTime();
          // console.log(time);
          // var time1=dbTStamp.getTimezoneOffset();
          // console.log(time1);
          // var dbDate=dbTStamp.getUTCDate();

          var hour=dbTStamp.getHours();
          var min=dbTStamp.getMinutes();
          var sec=dbTStamp.getSeconds();

          var time=hour+":"+min+":"+sec;
          console.log(time);
          // for(let d=0;d<this.date.length;d++)
          // {
          //   if(dbDate==this.date[d])
          //   {
          //     this.myarray[a][d]=temp[l].data.d.usage;
          //     break;
          //   }
          // }
        }
        // console.log(this.myarray[a]);
        this.chartData2.push({data:this.myarray[a],label:this.selectedAreaItems[a]}); 
       this.status++;
       console.log(this.selectedAreaItems.length);
       console.log(this.status);
     })
     console.log(this.myarray);
     
    }
    //this.myarray=[45,67,34,78]
    //console.log(this.myarray);
    // this.chartData2 = [
    //   // { data:  [45,67,34,78] , label: this.selectedAreaItems[0] },
    //   // { data:  [45,56,63,65] , label: this.selectedAreaItems[1] }
    // ];
    
    console.log(this.chartData2);
    
  
  }
  
      // console.log("chartData"+JSON.stringify(this.chartData2, undefined ,2));
  

  ngOnInit() {
    this.selectedCityItems=[];
    
    this.http.get("http://localhost:3000/display/cities").subscribe(res=>{
      var temp=res.json();
      console.log(temp);
      for(let i=0;i<3;i++)
      {
        this.arrcity[i]=temp.rows[i].doc.city;
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

onCitySelect(item){
  
  console.log(item);
  console.log("select"+this.selectedCityItems);
  console.log("items selected"+item);
  this.mapping();
}

onCitySelectAll(items){
  console.log(items);
}

onCityDeSelectAll(items){
  console.log(items);
    
  }

  onAreaSelect(item){
  
    console.log(item);
    console.log(this.selectedAreaItems);
    console.log("items selected"+item);  
    this.status=0;
  }
  onAreaDeSelect(item){
  
    console.log("Deselect"+item);
    console.log(this.selectedAreaItems);
    this.status=0;
    console.log(this.status);
    console.log(this.selectedAreaItems.length);
  }
  
  onAreaSelectAll(items){
    console.log(items);
  }
  
  onAreaDeSelectAll(items){
    console.log(items);
      
    }
  
}

