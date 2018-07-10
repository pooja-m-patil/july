import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BlueColorDirective } from './blue-color.directive';
import { RouterModule, Routes} from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './user.service';
import {AuthguardGuard} from './authguard.guard';
import { HttpModule } from '@angular/http';
import { RetrivedataComponent } from './retrivedata/retrivedata.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { ChartsModule } from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { FeaturesComponent } from './features/features.component';
import { FetchdataComponent } from './fetchdata/fetchdata.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DeviceDiscoveryComponent } from './device-discovery/device-discovery.component';
import { DataService } from './data.service';
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import { DevicetypeComponent } from './devicetype/devicetype.component';
import { SignupComponent } from './signup/signup.component';
import { ConnectionRequestComponent } from './connection-request/connection-request.component';
import { ConnectedDevicesComponent } from './connected-devices/connected-devices.component';
import { RequestedConnectionComponent } from './requested-connection/requested-connection.component';
import { AgmCoreModule } from '@agm/core';
import { MappingDevicesComponent } from './mapping-devices/mapping-devices.component';
import { AdminConnectionListComponent } from './admin-connection-list/admin-connection-list.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
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
  path:'add-device',
  canActivate:[AuthguardGuard],
  component:AddDeviceComponent
},
{
  path:'graph',
  canActivate:[AuthguardGuard],
  component:GraphComponent
},
{
  path:'features',
  canActivate:[AuthguardGuard],
  component:FeaturesComponent
},
  {
    path:'retrivedata',
    canActivate:[AuthguardGuard],
    component:RetrivedataComponent
},
{
  path:'devicediscovery',
  canActivate:[AuthguardGuard],
  component:DeviceDiscoveryComponent
},
{
  path:'devicetype',
  canActivate:[AuthguardGuard],
  component:DevicetypeComponent
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
  path:'chatbox',
  canActivate:[AuthguardGuard],
  component:ChatboxComponent
}



]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlueColorDirective,
    LoginFormComponent,
    FooterComponent,
    DashboardComponent,
    RetrivedataComponent,
    AddDeviceComponent,
    GraphComponent,
    FeaturesComponent,
    FetchdataComponent,
    DeviceDiscoveryComponent,
    DevicetypeComponent,
    SignupComponent,
    ConnectionRequestComponent,
    ConnectedDevicesComponent,
    RequestedConnectionComponent,
    MappingDevicesComponent,
    AdminConnectionListComponent,
    ChatboxComponent,
    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    //RouterModule.forRoot(dashRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule,
    LocalStorageModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBTDyDZ0rmFgml50uuXJdEK0vwMWmn8EqY'
    }),
    NgMultiSelectDropDownModule.forRoot()
    //AppRoutingModule
  ],
  providers: [UserService,AuthguardGuard,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
