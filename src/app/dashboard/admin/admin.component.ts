import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from "@angular/http";
import 'rxjs/Rx';

import { DataServices } from '../data.services';


@Component({
  selector: 'admin',
  templateUrl: './admin.html',
  providers: [DataServices]
})

export class AdminComponent { 

	constructor(private http: Http, private router: Router, private dataservice: DataServices){

	}

	ngOnInit(){
		var hashForAdmin = 'e3afed0047b08059d0fada10f400c1e5';

		var cookieValue = this.dataservice.getSessionRole();
		var userID = this.dataservice.getSessionID();

		if(cookieValue != hashForAdmin){
			this.router.navigate(['login']);
		}
		else{
			this.dataservice.fetchInfoAdmin(userID).subscribe(
				(data) => this.adminDetail = data
			);

			this.http.get('http://localhost:5000/getLastId').map(
			(res) => res.json()
			).subscribe((id) => {
				document.cookie = "newID=" +id[0].numOfUser;
			});

			this.dataservice.fetchDataForUsers().subscribe(
				(data) => this.allUsers = data
			);

			this.dataservice.fetchDataForAssignedUsers(userID).subscribe(
				(data) => this.assignedUsers = data
			);
		}
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

	addUser(event){
		var newID = this.dataservice.getNewID();
		var creatorID = this.dataservice.getUserID();

		var newUser = {
			id: newID,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			createdBy: creatorID
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

	editUser(id){
		this.router.navigate(['edit/user/'+id]);	
	}


	logout(){
		this.dataservice.logout();
	}

} 
