import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent }  from 'app/login/login.component';
import { SuperAdminComponent }  from 'app/dashboard/sa/superadmin.component';
import { UserComponent }  from 'app/dashboard/user/user.component';
import { AdminComponent }  from 'app/dashboard/admin/admin.component';
import { AddUserComponent }  from 'app/dashboard/user/add/adduser.component';
import { EditUserComponent } from 'app/dashboard/user/edit/edituser.component';
import { AddAdminComponent }  from 'app/dashboard/admin/add/addadmin.component';
import { EditAdminComponent } from 'app/dashboard/admin/edit/editadmin.component';
import { DataServices }  from 'app/dashboard/data.services';


import { MainContainer } from 'app/main.container';
import { routing } from 'app/app.routing';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, routing ],
  declarations: [ MainContainer, LoginComponent, SuperAdminComponent, AdminComponent, AddAdminComponent, UserComponent, AddUserComponent, DataServices, EditUserComponent, EditAdminComponent],
  bootstrap:    [ MainContainer ]
})
export class AppModule { }
