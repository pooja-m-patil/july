import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../model';
import { UserService } from '../user.service';
import { Http, Response, Headers } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  data: object = {};
  arraymsg = [];
  public model = new Model();
  username = "codedamn";
  msgObj: object = {};
  msg: string;
  showDiv: boolean = false;
  self: boolean = false;
  messages = [];
  userData: string;
  disc_msg: string;
  disc_req: string;


  stockQuote: number;
  sub: Subscription;

  constructor(private http: HttpClient, private router: Router, private user: UserService, private dataService: DataService) {

    this.model.isFetch = false;
  }

  changeUsername(ev) {
    this.username = ev.target.value;
  }

  graph = function () {

    this.router.navigate(['graph']);
  }

  Navigate(value) {
    this.router.navigate([value]);
  }

  adminSelect(val) {
    if (val == 'logout') {
      this.user.logout();
      this.router.navigate(['/']);
    }
    else if (val == 'home') {
      this.router.navigate(['dashboard']);
    }
  }

  watson = function (e) {
    e.preventDefault();
    this.msg = e.target.elements[0].value;
    this.self = true;
    this.pushData();
    console.log(this.msg);
    this.msgObj = {
      "msg": this.msg
    }
    this.userData = "";
    this.http.post('http://localhost:3000/watson/assistants', this.msgObj)
      .subscribe((res: Response) => {

        this.self = false;
        var response = JSON.parse(JSON.stringify(res));
        console.log(response);
        var temp = response.data;
        if (temp == 'Error') {

          this.http.post('http://localhost:3000/watson/discovery', this.msgObj)
            .subscribe((res: Response) => {
              console.log(res);
              var temp = JSON.parse(JSON.stringify(res));
              console.log(temp);
              if (temp.data.results[0]) {
                this.msg = 'Sorry. Cannot recognize the input. Is this what you wanted to find?';
                this.self = false;
                this.pushData();
                var change = temp.data.results[0].highlight.text[0].toString();
                //var text = $(content).text();
                //this.msg=change.match('/<{1}\/{0,1}\w+>{1}/');
                this.msg = change.replace(/<[^>]*>/g, '');
                console.log(this.msg);
                this.self = false;
                this.pushData();
              }
              else {
                this.self = false;
                this.msg = "Sorry.. Can not recognize. Try again..";
                this.pushData();
              }
            })
        }
        else {
          this.msg = temp;
          this.self = false;
          this.pushData();
        }

      })
  }

  toggleDiv = function () {
    this.showDiv = !this.showDiv;
  }

  pushData = function () {
    this.messages.push({
      "text": this.msg,
      "self": this.self
    })
  }


  ngOnInit() {

    this.http.get('http://localhost:3000/watson/assistants')
      .subscribe((res: Response) => {
        console.log("res");
        console.log(res);
        var temp = JSON.parse(JSON.stringify(res));
        this.msg = temp.data;
        this.pushData();
      })
  }

  ngOnDestroy() { }
}








