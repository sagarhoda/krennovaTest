import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from "@angular/http";
import 'rxjs/Rx';

import { DataServices } from '../../data.services';


@Component({
  selector: 'editadmin',
  templateUrl: './editAdmin.html',
  providers: [DataServices]
})

export class EditAdminComponent { 

	constructor(private http: Http, private router: Router, private dataservice: DataServices, private route: ActivatedRoute){

	}

	ngOnInit(){
		var userID = this.dataservice.getSessionID();

		this.sub = this.route.params.subscribe(params => {
       this.dataservice.fetchInfoAdmin(params['id']).subscribe(
					(data) => this.adminInfo = data
				);
				this.dataservice.fetchInfo(userID).subscribe(
					(data) => this.userDetail = data
				);
				this.dataservice.fetchLoginInfo(params['id']).subscribe(
					(data) => this.adminLogin = data
				);
    });
	}

	editAdmin(id, firstname, lastname, email){
		var adminInfo = {
			id: id ,
			firstName: firstname,
			lastName: lastname,
			email: email
		};

		this.dataservice.updateAdmin(adminInfo).subscribe(user => {});

		alert('Admin Information Updated');

		location.reload();
	}

	editLogin(id, username){
		var loginInfo = {
			id: id ,
			username: username
		};

		this.dataservice.updateLogin(loginInfo).subscribe(user => {});

		alert('Login Information Updated');

		location.reload();
	}

	logout(){
		this.dataservice.logout();
	}
	
} 
