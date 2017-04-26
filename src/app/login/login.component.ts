import { Component } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from "@angular/http";
import 'rxjs/Rx';


@Component({
  selector: 'login',
  templateUrl: './loginForm.html'
})

export class LoginComponent { 
	
	constructor(private http: Http, private router: Router){
		
	}

	ngOnInit(){
		var x = document.cookie.split(';');
		var i=0;
		var cookieValue;
		var userID;
		var hashForSuperAdmin = 'dbf36ff3e3827639223983ee8ac47b42';
		var hashForUser = '8f9bfe9d1345237cb3b2b205864da075';
		var hashForAdmin = 'e3afed0047b08059d0fada10f400c1e5';

		for(;i<x.length; i++){
			if(x[i].split('=')[0].trim() == 'sessionRole'){
				cookieValue = x[i].split('=')[1];
			}
			if(x[i].split('=')[0].trim() == 'sessionID'){
				userID = x[i].split('=')[1];
			}
		}

		if(cookieValue == hashForSuperAdmin && userID){
			this.router.navigate(['dashboard/sa'])
		}

		if(cookieValue == hashForAdmin && userID){
			this.router.navigate(['dashboard/admin'])
		}

		if(cookieValue == hashForUser && userID){
			this.router.navigate(['dashboard/usr'])
		}


	}

	formSubmit(username, password){
		var usr = username;
		var pwd = Md5.hashStr(password);

		this.http.post('http://localhost:5000/login/'+usr+'/'+pwd)
		.map(res =>  res.json())
		.subscribe((user) => {
			if(user[0]!=null){
				if(user[0].role == "Super Admin"){
					document.cookie = "sessionRole=" + Md5.hashStr(user[0].role);
					document.cookie = "sessionID=" +user[0].id;
					this.router.navigate(['dashboard/sa'])
				}
				if(user[0].role == "User"){
					document.cookie = "sessionRole=" + Md5.hashStr(user[0].role);
					document.cookie = "sessionID=" +user[0].id;
					this.router.navigate(['dashboard/usr'])
				}
				if(user[0].role == "Admin"){
					document.cookie = "sessionRole=" + Md5.hashStr(user[0].role);
					document.cookie = "sessionID=" +user[0].id;
					this.router.navigate(['dashboard/admin'])
				}
			}
			else{
				document.cookie = "sessionRole=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
				document.cookie = "sessionID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
				document.cookie = "newID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
				alert('Invalid Username or Password');
			}
		});
	}
}
