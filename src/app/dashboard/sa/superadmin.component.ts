import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from "@angular/http";
import 'rxjs/Rx';

import { DataServices } from '../data.services';


@Component({
  selector: 'superadmin',
  templateUrl: './superadmin.html',
  providers: [DataServices]
})

export class SuperAdminComponent { 
	superadmins = [];
	admins = [];
	userDetail = [];
	userInfo = [];

	constructor(private http: Http, private router: Router, private dataservice: DataServices){

	}

	ngOnInit(){
		var hashForSuperAdmin = 'dbf36ff3e3827639223983ee8ac47b42';

		var cookieValue = this.dataservice.getSessionRole();
		var userID = this.dataservice.getSessionID();


		if(cookieValue != hashForSuperAdmin){
			this.router.navigate(['login']);
		}
		else{
			this.dataservice.fetchData().subscribe(
				(data) => this.superadmins = data
			);

			this.dataservice.fetchInfo(userID).subscribe(
				(data) => this.userDetail = data
			);

			this.dataservice.fetchDataForNotFreeAdmins().subscribe(
				(data) => this.notFreeAdmins = data
			);

			this.dataservice.fetchDataForFreeAdmins().subscribe(
				(data) => this.freeAdmins = data
			);

			this.dataservice.fetchDataForUsers().subscribe(
				(data) => this.users = data
			);
		}
		
	}

	deleteAdmin(id){
		this.dataservice.deleteAdmin(id).subscribe(
				(data) => console.log('Admin Deleted')
			);
		this.dataservice.deleteFromLogin(id).subscribe(
			(data) => console.log('Admin Deleted From Login')
		);

		alert('Admin Deleted');

		location.reload();
	}

	deleteUser(id){
		this.dataservice.deleteUser(id).subscribe(
				(data) => console.log('User Deleted')
			);
		this.dataservice.deleteFromLogin(id).subscribe(
			(data) => console.log('User Deleted From Login')
		);

		alert('User Deleted');

		location.reload();
	}

	editUser(id){
		this.router.navigate(['edit/user/'+id]);
	}

	editAdmin(id){
		this.router.navigate(['edit/admin/'+id]);
	}

	logout(){
		this.dataservice.logout();
	}

} 
