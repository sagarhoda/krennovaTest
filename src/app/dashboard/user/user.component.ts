import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from "@angular/http";
import 'rxjs/Rx';

import { DataServices } from '../data.services';


@Component({
  selector: 'user',
  templateUrl: './user.html',
  providers: [DataServices]
})

export class UserComponent { 
	userDetail = [];

	constructor(private http: Http, private router: Router, private dataservice: DataServices){

	}

	ngOnInit(){
		var hashForUser = '8f9bfe9d1345237cb3b2b205864da075';

		var cookieValue = this.dataservice.getSessionRole();
		var userID = this.dataservice.getSessionID();

		if(cookieValue != hashForUser){
			this.router.navigate(['login']);
		}
		else{
			this.dataservice.fetchInfoUser(userID).subscribe(
				(data) => this.userDetail = data;
			);
		}
		
	}

	logout(){
		this.dataservice.logout();
	}

} 
