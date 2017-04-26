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
var UserComponent = (function () {
    function UserComponent(http, router, dataservice) {
        this.http = http;
        this.router = router;
        this.dataservice = dataservice;
        this.userDetail = [];
    }
    UserComponent.prototype.ngOnInit = function () {
        var _this = this;
        var hashForUser = '8f9bfe9d1345237cb3b2b205864da075';
        var cookieValue = this.dataservice.getSessionRole();
        var userID = this.dataservice.getSessionID();
        if (cookieValue != hashForUser) {
            this.router.navigate(['login']);
        }
        else {
            this.dataservice.fetchInfoUser(userID).subscribe(function (data) { return _this.userDetail = data; });
            ;
        }
    };
    UserComponent.prototype.logout = function () {
        this.dataservice.logout();
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        selector: 'user',
        templateUrl: './user.html',
        providers: [data_services_1.DataServices]
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, data_services_1.DataServices])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map