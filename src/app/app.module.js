"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var login_component_1 = require("app/login/login.component");
var superadmin_component_1 = require("app/dashboard/sa/superadmin.component");
var user_component_1 = require("app/dashboard/user/user.component");
var admin_component_1 = require("app/dashboard/admin/admin.component");
var adduser_component_1 = require("app/dashboard/user/add/adduser.component");
var edituser_component_1 = require("app/dashboard/user/edit/edituser.component");
var addadmin_component_1 = require("app/dashboard/admin/add/addadmin.component");
var editadmin_component_1 = require("app/dashboard/admin/edit/editadmin.component");
var data_services_1 = require("app/dashboard/data.services");
var main_container_1 = require("app/main.container");
var app_routing_1 = require("app/app.routing");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing],
        declarations: [main_container_1.MainContainer, login_component_1.LoginComponent, superadmin_component_1.SuperAdminComponent, admin_component_1.AdminComponent, addadmin_component_1.AddAdminComponent, user_component_1.UserComponent, adduser_component_1.AddUserComponent, data_services_1.DataServices, edituser_component_1.EditUserComponent, editadmin_component_1.EditAdminComponent],
        bootstrap: [main_container_1.MainContainer]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map