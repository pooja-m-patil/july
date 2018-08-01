import { Component,OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from './model';
import { UserService } from './user.service';
import { Http, Response, Headers } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,OnDestroy{

  constructor(private http: Http,private router:Router,private user:UserService) 
  {}

  ngOnInit() {}
  
  ngOnDestroy() {}
}



  

  

  
