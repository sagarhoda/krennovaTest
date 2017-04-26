import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';


@Component({
  selector: '',
  template: ''
})

export class DataServices { 
	constructor(private http: Http, private router: Router){
	}

	fetchData(){
		return this.http.get('http://localhost:5000/superadmins').map(
			(res) => res.json()
		);
	}

	fetchInfo(id){
		return this.http.get('http://localhost:5000/superadmin/'+id).map(
			(res) => res.json()
		);
	}

	fetchInfoUser(id){
		return this.http.get('http://localhost:5000/getUser/'+id).map(
			(res) => res.json()
		);
	}

	fetchAdmins(){
		return this.http.get('http://localhost:5000/admins').map(
			(res) => res.json()
		);
	}

	fetchInfoAdmin(id){
		return this.http.get('http://localhost:5000/getAdmin/'+id).map(
			(res) => res.json()
		);
	}

	fetchLoginInfo(id){
		return this.http.get('http://localhost:5000/login/'+id).map(
			(res) => res.json()
		);
	}

	fetchDataForFreeAdmins(){
		return this.http.get('http://localhost:5000/freeAdmins').map(
			(res) => res.json()
		);
	}

	fetchDataForNotFreeAdmins(){
		return this.http.get('http://localhost:5000/notFreeAdmins').map(
			(res) => res.json()
		);
	}

	fetchDataForUsers(){
		return this.http.get('http://localhost:5000/users').map(
			(res) => res.json()
		);
	}

	fetchDataForAssignedUsers(id){
		return this.http.get('http://localhost:5000/getAssignedUser/'+id).map(
			(res) => res.json()
		);
	}

	deleteAdmin(id){
		return this.http.delete('http://localhost:5000/deleteAdmin/'+id).map(
			(res) => res.json()
		);
	}

	deleteUser(id){
		return this.http.delete('http://localhost:5000/deleteUser/'+id).map(
			(res) => res.json()
		);
	}

	deleteFromLogin(id){
		return this.http.delete('http://localhost:5000/deleteFromLogin/'+id).map(
			(res) => res.json()
		);
	}

	addUser(newUser){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:5000/user', newUser, {header: headers}).map(
			(res) => res.json();
		)
	}

	addNewLogin(newLogin){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:5000/new/login', newLogin, {header: headers}).map(
			(res) => res.json();
		)
	}

	addAdmin(newAdmin){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:5000/admin', newAdmin, {header: headers}).map(
			(res) => res.json();
		)
	}

	updateUser(user){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('http://localhost:5000/update/user', user, {header: headers}).map(
			(res) => res.json();
		)
	}

	updateAdmin(admin){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('http://localhost:5000/update/admin', admin, {header: headers}).map(
			(res) => res.json();
		)
	}

	updateLogin(info){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('http://localhost:5000/update/login', info, {header: headers}).map(
			(res) => res.json();
		)
	}

	logout(){
		document.cookie = "sessionRole=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		document.cookie = "sessionID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		document.cookie = "newID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		
		this.router.navigate(['login']);
	}

	getNewID(){
		var x = document.cookie.split(';');
		var i=0;
		var newID;

		for(;i<x.length; i++){
			if(x[i].split('=')[0].trim() == 'newID'){
				newID = x[i].split('=')[1];
			}
		}
		return newID;
	}

	getUserID(){
		var x = document.cookie.split(';');
		var i=0;
		var userID;

		for(;i<x.length; i++){
			if(x[i].split('=')[0].trim() == 'sessionID'){
				userID = x[i].split('=')[1];
			}
		}
		return userID;
	}

	getSessionRole(){
		var x = document.cookie.split(';');
		var i=0;
		var sessionRole;

		for(;i<x.length; i++){
			if(x[i].split('=')[0].trim() == 'sessionRole'){
				sessionRole = x[i].split('=')[1];
			}
		}
		return sessionRole;
	}

	getSessionID(){
		var x = document.cookie.split(';');
		var i=0;
		var sessionID;

		for(;i<x.length; i++){
			if(x[i].split('=')[0].trim() == 'sessionID'){
				sessionID = x[i].split('=')[1];
			}
		}
		return sessionID;
	}

} 
