import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes} from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './user.service';
import {AuthguardGuard} from './authguard.guard';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { FetchdataComponent } from './fetchdata/fetchdata.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DeviceDiscoveryComponent } from './device-discovery/device-discovery.component';
import { DataService } from './data.service';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { SignupComponent } from './signup/signup.component';
import { ConnectionRequestComponent } from './connection-request/connection-request.component';
import { ConnectedDevicesComponent } from './connected-devices/connected-devices.component';
import { RequestedConnectionComponent } from './requested-connection/requested-connection.component';
import { AgmCoreModule } from '@agm/core';
import { MappingDevicesComponent } from './mapping-devices/mapping-devices.component';
import { AdminConnectionListComponent } from './admin-connection-list/admin-connection-list.component';
import {NavbarComponent } from './navbar/navbar.component';
import { DeviceUsageComponent} from './device-usage/device-usage.component'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import {GoogleMapsAPIWrapper} from "angular2-google-maps/core/services/google-maps-api-wrapper"
//import {MapsAPILoader} from '@agm/core';



//import {AppRoutingModule} from './app-routing.module';
//import { Model } from './model';

const appRoutes:Routes=[
  
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'',
    component:LoginFormComponent
  },
  // { path: '', redirectTo: '/app-login-form', pathMatch: 'full' },
  {
      path:'dashboard',
      canActivate:[AuthguardGuard],
      component:DashboardComponent
  },
  {
    path:'fetchdata',
    canActivate:[AuthguardGuard],
    component:FetchdataComponent
},
{
  path:'graph',
  canActivate:[AuthguardGuard],
  component:GraphComponent
},
{
  path:'devicediscovery',
  canActivate:[AuthguardGuard],
  component:DeviceDiscoveryComponent
},
{
  path:'reqconnection',
  canActivate:[AuthguardGuard],
  component:ConnectionRequestComponent
},
{
  path:'requested_conn',
  canActivate:[AuthguardGuard],
  component:RequestedConnectionComponent
},
{
  path:'mapping-devices',
  canActivate:[AuthguardGuard],
  component:MappingDevicesComponent
},
{
  path:'connected-devices',
  canActivate:[AuthguardGuard],
  component:ConnectedDevicesComponent
},
{
  path:'admin-connections',
  canActivate:[AuthguardGuard],
  component:AdminConnectionListComponent
},
{
  path:'device-usage',
  canActivate:[AuthguardGuard],
  component:DeviceUsageComponent
}
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    DashboardComponent,
    GraphComponent,
    FetchdataComponent,
    DeviceDiscoveryComponent,
    SignupComponent,
    ConnectionRequestComponent,
    ConnectedDevicesComponent,
    RequestedConnectionComponent,
    MappingDevicesComponent,
    AdminConnectionListComponent,
    NavbarComponent,
    DeviceUsageComponent
    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    //RouterModule.forRoot(dashRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ChartsModule,
    LocalStorageModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBTDyDZ0rmFgml50uuXJdEK0vwMWmn8EqY'
    }),
    NgMultiSelectDropDownModule.forRoot()
    //AppRoutingModule
  ],
  providers: [UserService,AuthguardGuard,DataService,InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
