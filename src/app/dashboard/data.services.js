"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var DataServices = (function () {
    function DataServices(http, router) {
        this.http = http;
        this.router = router;
    }
    DataServices.prototype.fetchData = function () {
        return this.http.get('http://localhost:5000/superadmins').map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchInfo = function (id) {
        return this.http.get('http://localhost:5000/superadmin/' + id).map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchInfoUser = function (id) {
        return this.http.get('http://localhost:5000/getUser/' + id).map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchAdmins = function () {
        return this.http.get('http://localhost:5000/admins').map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchInfoAdmin = function (id) {
        return this.http.get('http://localhost:5000/getAdmin/' + id).map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchLoginInfo = function (id) {
        return this.http.get('http://localhost:5000/login/' + id).map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchDataForFreeAdmins = function () {
        return this.http.get('http://localhost:5000/freeAdmins').map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchDataForNotFreeAdmins = function () {
        return this.http.get('http://localhost:5000/notFreeAdmins').map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchDataForUsers = function () {
        return this.http.get('http://localhost:5000/users').map(function (res) { return res.json(); });
    };
    DataServices.prototype.fetchDataForAssignedUsers = function (id) {
        return this.http.get('http://localhost:5000/getAssignedUser/' + id).map(function (res) { return res.json(); });
    };
    DataServices.prototype.deleteAdmin = function (id) {
        return this.http.delete('http://localhost:5000/deleteAdmin/' + id).map(function (res) { return res.json(); });
    };
    DataServices.prototype.deleteUser = function (id) {
        return this.http.delete('http://localhost:5000/deleteUser/' + id).map(function (res) { return res.json(); });
    };
    DataServices.prototype.deleteFromLogin = function (id) {
        return this.http.delete('http://localhost:5000/deleteFromLogin/' + id).map(function (res) { return res.json(); });
    };
    DataServices.prototype.addUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:5000/user', newUser, { header: headers }).map(function (res) { return res.json(); });
    };
    DataServices.prototype.addNewLogin = function (newLogin) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:5000/new/login', newLogin, { header: headers }).map(function (res) { return res.json(); });
    };
    DataServices.prototype.addAdmin = function (newAdmin) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:5000/admin', newAdmin, { header: headers }).map(function (res) { return res.json(); });
    };
    DataServices.prototype.updateUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:5000/update/user', user, { header: headers }).map(function (res) { return res.json(); });
    };
    DataServices.prototype.updateAdmin = function (admin) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:5000/update/admin', admin, { header: headers }).map(function (res) { return res.json(); });
    };
    DataServices.prototype.updateLogin = function (info) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:5000/update/login', info, { header: headers }).map(function (res) { return res.json(); });
    };
    DataServices.prototype.logout = function () {
        document.cookie = "sessionRole=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        document.cookie = "sessionID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        document.cookie = "newID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        this.router.navigate(['login']);
    };
    DataServices.prototype.getNewID = function () {
        var x = document.cookie.split(';');
        var i = 0;
        var newID;
        for (; i < x.length; i++) {
            if (x[i].split('=')[0].trim() == 'newID') {
                newID = x[i].split('=')[1];
            }
        }
        return newID;
    };
    DataServices.prototype.getUserID = function () {
        var x = document.cookie.split(';');
        var i = 0;
        var userID;
        for (; i < x.length; i++) {
            if (x[i].split('=')[0].trim() == 'sessionID') {
                userID = x[i].split('=')[1];
            }
        }
        return userID;
    };
    DataServices.prototype.getSessionRole = function () {
        var x = document.cookie.split(';');
        var i = 0;
        var sessionRole;
        for (; i < x.length; i++) {
            if (x[i].split('=')[0].trim() == 'sessionRole') {
                sessionRole = x[i].split('=')[1];
            }
        }
        return sessionRole;
    };
    DataServices.prototype.getSessionID = function () {
        var x = document.cookie.split(';');
        var i = 0;
        var sessionID;
        for (; i < x.length; i++) {
            if (x[i].split('=')[0].trim() == 'sessionID') {
                sessionID = x[i].split('=')[1];
            }
        }
        return sessionID;
    };
    return DataServices;
}());
DataServices = __decorate([
    core_1.Component({
        selector: '',
        template: ''
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], DataServices);
exports.DataServices = DataServices;
//# sourceMappingURL=data.services.js.map