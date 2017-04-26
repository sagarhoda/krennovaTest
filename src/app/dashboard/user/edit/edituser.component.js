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
var EditUserComponent = (function () {
    function EditUserComponent(http, router, dataservice, route) {
        this.http = http;
        this.router = router;
        this.dataservice = dataservice;
        this.route = route;
    }
    EditUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userID = this.dataservice.getSessionID();
        this.sub = this.route.params.subscribe(function (params) {
            _this.dataservice.fetchInfoUser(params['id']).subscribe(function (data) { return _this.userInfo = data; });
            _this.dataservice.fetchInfo(userID).subscribe(function (data) { return _this.userDetail = data; });
            _this.dataservice.fetchLoginInfo(params['id']).subscribe(function (data) { return _this.userLogin = data; });
        });
    };
    EditUserComponent.prototype.editUser = function (id, firstname, lastname, email) {
        var userInfo = {
            id: id,
            firstName: firstname,
            lastName: lastname,
            email: email
        };
        this.dataservice.updateUser(userInfo).subscribe(function (user) { });
        alert('User Information Updated');
        location.reload();
    };
    EditUserComponent.prototype.editLogin = function (id, username) {
        var loginInfo = {
            id: id,
            username: username
        };
        this.dataservice.updateLogin(loginInfo).subscribe(function (user) { });
        alert('Login Information Updated');
        location.reload();
    };
    EditUserComponent.prototype.logout = function () {
        this.dataservice.logout();
    };
    return EditUserComponent;
}());
EditUserComponent = __decorate([
    core_1.Component({
        selector: 'edituser',
        templateUrl: './editUser.html',
        providers: [data_services_1.DataServices]
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, data_services_1.DataServices, router_1.ActivatedRoute])
], EditUserComponent);
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=edituser.component.js.map