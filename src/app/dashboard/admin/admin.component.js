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
var md5_1 = require("ts-md5/dist/md5");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var data_services_1 = require("../data.services");
var AdminComponent = (function () {
    function AdminComponent(http, router, dataservice) {
        this.http = http;
        this.router = router;
        this.dataservice = dataservice;
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        var hashForAdmin = 'e3afed0047b08059d0fada10f400c1e5';
        var cookieValue = this.dataservice.getSessionRole();
        var userID = this.dataservice.getSessionID();
        if (cookieValue != hashForAdmin) {
            this.router.navigate(['login']);
        }
        else {
            this.dataservice.fetchInfoAdmin(userID).subscribe(function (data) { return _this.adminDetail = data; });
            this.http.get('http://localhost:5000/getLastId').map(function (res) { return res.json(); }).subscribe(function (id) {
                document.cookie = "newID=" + id[0].numOfUser;
            });
            this.dataservice.fetchDataForUsers().subscribe(function (data) { return _this.allUsers = data; });
            this.dataservice.fetchDataForAssignedUsers(userID).subscribe(function (data) { return _this.assignedUsers = data; });
        }
    };
    AdminComponent.prototype.deleteUser = function (id) {
        this.dataservice.deleteUser(id).subscribe(function (data) { return console.log('User Deleted'); });
        this.dataservice.deleteFromLogin(id).subscribe(function (data) { return console.log('User Deleted From Login'); });
        alert('User Deleted');
        location.reload();
    };
    AdminComponent.prototype.addUser = function (event) {
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
            password: md5_1.Md5.hashStr(this.password),
            role: 'User'
        };
        this.dataservice.addUser(newUser).subscribe(function (user) { });
        this.dataservice.addNewLogin(newLogin).subscribe(function (user) { });
        alert('User Added');
        document.cookie = "newID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        location.reload();
        this.router.navigate(['login']);
    };
    AdminComponent.prototype.editUser = function (id) {
        this.router.navigate(['edit/user/' + id]);
    };
    AdminComponent.prototype.logout = function () {
        this.dataservice.logout();
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        selector: 'admin',
        templateUrl: './admin.html',
        providers: [data_services_1.DataServices]
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, data_services_1.DataServices])
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map