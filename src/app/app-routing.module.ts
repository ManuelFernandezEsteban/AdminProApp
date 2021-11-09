import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AuthRoutingModule } from './auth/auth.routing.module';
import { PagesRoutingModule } from './pages/pages.routing.module';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';




const routes: Routes = [ 

  //path:'/dashboard PagesRouting
  //path:'/auth AuthRouting
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
