import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'load', loadChildren: './afterlogin.module#AfterloginModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }