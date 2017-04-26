import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from "@angular/http";
import 'rxjs/Rx';

import { DataServices } from '../../data.services';


@Component({
  selector: 'edituser',
  templateUrl: './editUser.html',
  providers: [DataServices]
})

export class EditUserComponent { 

	constructor(private http: Http, private router: Router, private dataservice: DataServices, private route: ActivatedRoute){

	}

	ngOnInit(){
		var userID = this.dataservice.getSessionID();

		this.sub = this.route.params.subscribe(params => {
       this.dataservice.fetchInfoUser(params['id']).subscribe(
					(data) => this.userInfo = data
				);
				this.dataservice.fetchInfo(userID).subscribe(
					(data) => this.userDetail = data
				);
				this.dataservice.fetchLoginInfo(params['id']).subscribe(
					(data) => this.userLogin = data
				);
    });
	}

	editUser(id, firstname, lastname, email){
		var userInfo = {
			id: id ,
			firstName: firstname,
			lastName: lastname,
			email: email
		};

		this.dataservice.updateUser(userInfo).subscribe(user => {});

		alert('User Information Updated');

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
