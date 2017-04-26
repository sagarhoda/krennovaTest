import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from "@angular/http";
import 'rxjs/Rx';

import { DataServices } from '../../data.services';


@Component({
  selector: 'adduser',
  templateUrl: './addUser.html',
  providers: [DataServices]
})

export class AddUserComponent { 
	userDetail = [];
	email: string;

	constructor(private http: Http, private router: Router, private dataservice: DataServices){

	}

	ngOnInit(){
		var hashForSuperAdmin = 'dbf36ff3e3827639223983ee8ac47b42';
		var hashForAdmin = 'e3afed0047b08059d0fada10f400c1e5';

		var cookieValue = this.dataservice.getSessionRole();
		var userID = this.dataservice.getSessionID();

		if((cookieValue == hashForSuperAdmin  && userID)||(cookieValue == hashForAdmin && userID)){
			this.dataservice.fetchInfo(userID).subscribe(
				(data) => this.userDetail = data;
			);

			this.http.get('http://localhost:5000/getLastId').map(
			(res) => res.json()
			).subscribe((id) => {
				document.cookie = "newID=" +id[0].numOfUser;
			});

			this.dataservice.fetchAdmins().subscribe(
				(data) => this.admins = data
			);

		}
		else{
			this.router.navigate(['login']);
		}
		
	}

	addUser(event){	
		var newID = this.dataservice.getNewID();

		var newUser = {
			id: newID,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			createdBy: this.admin
		};

		var newLogin = {
			id: newID,
			username: this.username,
			password: Md5.hashStr(this.password),
			role: 'User'
		};

		this.dataservice.addUser(newUser).subscribe(user => {});
		this.dataservice.addNewLogin(newLogin).subscribe(user => {});	

		alert('User Added');

		document.cookie = "newID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";

		location.reload();
		this.router.navigate(['login']);
	}

	logout(){
		this.dataservice.logout();
	}

} 
