import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './dashboard/sa/superadmin.component';
import { UserComponent } from './dashboard/user/user.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AddUserComponent } from './dashboard/user/add/adduser.component';
import { EditUserComponent } from './dashboard/user/edit/edituser.component';
import { AddAdminComponent } from './dashboard/admin/add/addadmin.component';
import { EditUserComponent } from './dashboard/user/edit/edituser.component';
import { EditAdminComponent } from './dashboard/admin/edit/editadmin.component';


const APP_ROUTES: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'dashboard/sa', component: SuperAdminComponent },
	{ path: 'dashboard/admin', component: AdminComponent },
	{ path: 'dashboard/usr', component: UserComponent },
	{ path: 'add/user', component: AddUserComponent },
	{ path: 'add/admin', component: AddAdminComponent },
	{ path: 'edit/user/:id', component: EditUserComponent },
	{ path: 'edit/admin/:id', component: EditAdminComponent },
	{ path: 'login', component: LoginComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);