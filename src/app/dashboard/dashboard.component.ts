import { Component, OnInit,Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Router } from '@angular/router';
import { Model } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  public model=new Model();
  
  constructor(private http: Http,private router:Router) {
    
    
    
  }

  

  


  ngOnInit() {}
  
}
