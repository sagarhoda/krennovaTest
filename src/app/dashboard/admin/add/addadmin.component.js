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
var data_services_1 = require("../../data.services");
var AddAdminComponent = (function () {
    function AddAdminComponent(http, router, dataservice) {
        this.http = http;
        this.router = router;
        this.dataservice = dataservice;
    }
    AddAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        var hashForSuperAdmin = 'dbf36ff3e3827639223983ee8ac47b42';
        var cookieValue = this.dataservice.getSessionRole();
        var userID = this.dataservice.getSessionID();
        if (cookieValue != hashForSuperAdmin) {
            this.router.navigate(['login']);
        }
        else {
            this.dataservice.fetchInfo(userID).subscribe(function (data) { return _this.userDetail = data; });
            ;
            this.http.get('http://localhost:5000/getLastId').map(function (res) { return res.json(); }).subscribe(function (id) {
                document.cookie = "newID=" + id[0].numOfUser;
            });
        }
    };
    AddAdminComponent.prototype.addAdmin = function (event) {
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
            password: md5_1.Md5.hashStr(this.password),
            role: 'Admin'
        };
        this.dataservice.addAdmin(newAdmin).subscribe(function (user) { });
        this.dataservice.addNewLogin(newLogin).subscribe(function (user) { });
        alert('Admin Added');
        document.cookie = "newID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        location.reload();
        this.router.navigate(['login']);
    };
    AddAdminComponent.prototype.logout = function () {
        this.dataservice.logout();
    };
    return AddAdminComponent;
}());
AddAdminComponent = __decorate([
    core_1.Component({
        selector: 'addadmin',
        templateUrl: './addadmin.html',
        providers: [data_services_1.DataServices]
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, data_services_1.DataServices])
], AddAdminComponent);
exports.AddAdminComponent = AddAdminComponent;
//# sourceMappingURL=addadmin.component.js.map