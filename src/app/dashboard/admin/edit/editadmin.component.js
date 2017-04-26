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
var data_services_1 = require("../../data.services");
var EditAdminComponent = (function () {
    function EditAdminComponent(http, router, dataservice, route) {
        this.http = http;
        this.router = router;
        this.dataservice = dataservice;
        this.route = route;
    }
    EditAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userID = this.dataservice.getSessionID();
        this.sub = this.route.params.subscribe(function (params) {
            _this.dataservice.fetchInfoAdmin(params['id']).subscribe(function (data) { return _this.adminInfo = data; });
            _this.dataservice.fetchInfo(userID).subscribe(function (data) { return _this.userDetail = data; });
            _this.dataservice.fetchLoginInfo(params['id']).subscribe(function (data) { return _this.adminLogin = data; });
        });
    };
    EditAdminComponent.prototype.editAdmin = function (id, firstname, lastname, email) {
        var adminInfo = {
            id: id,
            firstName: firstname,
            lastName: lastname,
            email: email
        };
        this.dataservice.updateAdmin(adminInfo).subscribe(function (user) { });
        alert('Admin Information Updated');
        location.reload();
    };
    EditAdminComponent.prototype.editLogin = function (id, username) {
        var loginInfo = {
            id: id,
            username: username
        };
        this.dataservice.updateLogin(loginInfo).subscribe(function (user) { });
        alert('Login Information Updated');
        location.reload();
    };
    EditAdminComponent.prototype.logout = function () {
        this.dataservice.logout();
    };
    return EditAdminComponent;
}());
EditAdminComponent = __decorate([
    core_1.Component({
        selector: 'editadmin',
        templateUrl: './editAdmin.html',
        providers: [data_services_1.DataServices]
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, data_services_1.DataServices, router_1.ActivatedRoute])
], EditAdminComponent);
exports.EditAdminComponent = EditAdminComponent;
//# sourceMappingURL=editadmin.component.js.map