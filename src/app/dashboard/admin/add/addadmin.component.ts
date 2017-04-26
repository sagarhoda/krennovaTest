import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from "@angular/http";
import 'rxjs/Rx';

import { DataServices } from '../../data.services';

@Component({
  selector: 'addadmin',
  templateUrl: './addadmin.html',
  providers: [DataServices]
})

export class AddAdminComponent { 
	
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
			this.dataservice.fetchInfo(userID).subscribe(
				(data) => this.userDetail = data;
			);
			
			this.http.get('http://localhost:5000/getLastId').map(
			(res) => res.json()
			).subscribe((id) => {
				document.cookie = "newID=" +id[0].numOfUser;
			});
		}	
	}

	addAdmin(event){	
		var newID = this.dataservice.getNewID();
		var creatorID = this.dataservice.getSessionID();

		var newAdmin = {
			aid: newID,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			createdBy: creatorID
		};

		var newLogin = {
			id: newID,
			username: this.username,
			password: Md5.hashStr(this.password),
			role: 'Admin'
		};

		this.dataservice.addAdmin(newAdmin).subscribe(user => {});
		this.dataservice.addNewLogin(newLogin).subscribe(user => {});

		alert('Admin Added');

		document.cookie = "newID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";

		location.reload();

		this.router.navigate(['login']);
	}

	logout(){
		this.dataservice.logout();
	}

} 
