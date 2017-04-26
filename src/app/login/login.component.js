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
var md5_1 = require("ts-md5/dist/md5");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var LoginComponent = (function () {
    function LoginComponent(http, router) {
        this.http = http;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var x = document.cookie.split(';');
        var i = 0;
        var cookieValue;
        var userID;
        var hashForSuperAdmin = 'dbf36ff3e3827639223983ee8ac47b42';
        var hashForUser = '8f9bfe9d1345237cb3b2b205864da075';
        var hashForAdmin = 'e3afed0047b08059d0fada10f400c1e5';
        for (; i < x.length; i++) {
            if (x[i].split('=')[0].trim() == 'sessionRole') {
                cookieValue = x[i].split('=')[1];
            }
            if (x[i].split('=')[0].trim() == 'sessionID') {
                userID = x[i].split('=')[1];
            }
        }
        if (cookieValue == hashForSuperAdmin && userID) {
            this.router.navigate(['dashboard/sa']);
        }
        if (cookieValue == hashForAdmin && userID) {
            this.router.navigate(['dashboard/admin']);
        }
        if (cookieValue == hashForUser && userID) {
            this.router.navigate(['dashboard/usr']);
        }
    };
    LoginComponent.prototype.formSubmit = function (username, password) {
        var _this = this;
        var usr = username;
        var pwd = md5_1.Md5.hashStr(password);
        this.http.post('http://localhost:5000/login/' + usr + '/' + pwd)
            .map(function (res) { return res.json(); })
            .subscribe(function (user) {
            if (user[0] != null) {
                if (user[0].role == "Super Admin") {
                    document.cookie = "sessionRole=" + md5_1.Md5.hashStr(user[0].role);
                    document.cookie = "sessionID=" + user[0].id;
                    _this.router.navigate(['dashboard/sa']);
                }
                if (user[0].role == "User") {
                    document.cookie = "sessionRole=" + md5_1.Md5.hashStr(user[0].role);
                    document.cookie = "sessionID=" + user[0].id;
                    _this.router.navigate(['dashboard/usr']);
                }
                if (user[0].role == "Admin") {
                    document.cookie = "sessionRole=" + md5_1.Md5.hashStr(user[0].role);
                    document.cookie = "sessionID=" + user[0].id;
                    _this.router.navigate(['dashboard/admin']);
                }
            }
            else {
                document.cookie = "sessionRole=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
                document.cookie = "sessionID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
                document.cookie = "newID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
                alert('Invalid Username or Password');
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './loginForm.html'
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map