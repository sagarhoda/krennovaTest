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
var data_services_1 = require("../data.services");
var SuperAdminComponent = (function () {
    function SuperAdminComponent(http, router, dataservice) {
        this.http = http;
        this.router = router;
        this.dataservice = dataservice;
        this.superadmins = [];
        this.admins = [];
        this.userDetail = [];
        this.userInfo = [];
    }
    SuperAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        var hashForSuperAdmin = 'dbf36ff3e3827639223983ee8ac47b42';
        var cookieValue = this.dataservice.getSessionRole();
        var userID = this.dataservice.getSessionID();
        if (cookieValue != hashForSuperAdmin) {
            this.router.navigate(['login']);
        }
        else {
            this.dataservice.fetchData().subscribe(function (data) { return _this.superadmins = data; });
            this.dataservice.fetchInfo(userID).subscribe(function (data) { return _this.userDetail = data; });
            this.dataservice.fetchDataForNotFreeAdmins().subscribe(function (data) { return _this.notFreeAdmins = data; });
            this.dataservice.fetchDataForFreeAdmins().subscribe(function (data) { return _this.freeAdmins = data; });
            this.dataservice.fetchDataForUsers().subscribe(function (data) { return _this.users = data; });
        }
    };
    SuperAdminComponent.prototype.deleteAdmin = function (id) {
        this.dataservice.deleteAdmin(id).subscribe(function (data) { return console.log('Admin Deleted'); });
        this.dataservice.deleteFromLogin(id).subscribe(function (data) { return console.log('Admin Deleted From Login'); });
        alert('Admin Deleted');
        location.reload();
    };
    SuperAdminComponent.prototype.deleteUser = function (id) {
        this.dataservice.deleteUser(id).subscribe(function (data) { return console.log('User Deleted'); });
        this.dataservice.deleteFromLogin(id).subscribe(function (data) { return console.log('User Deleted From Login'); });
        alert('User Deleted');
        location.reload();
    };
    SuperAdminComponent.prototype.editUser = function (id) {
        this.router.navigate(['edit/user/' + id]);
    };
    SuperAdminComponent.prototype.editAdmin = function (id) {
        this.router.navigate(['edit/admin/' + id]);
    };
    SuperAdminComponent.prototype.logout = function () {
        this.dataservice.logout();
    };
    return SuperAdminComponent;
}());
SuperAdminComponent = __decorate([
    core_1.Component({
        selector: 'superadmin',
        templateUrl: './superadmin.html',
        providers: [data_services_1.DataServices]
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, data_services_1.DataServices])
], SuperAdminComponent);
exports.SuperAdminComponent = SuperAdminComponent;
//# sourceMappingURL=superadmin.component.js.map