"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var superadmin_component_1 = require("./dashboard/sa/superadmin.component");
var user_component_1 = require("./dashboard/user/user.component");
var admin_component_1 = require("./dashboard/admin/admin.component");
var adduser_component_1 = require("./dashboard/user/add/adduser.component");
var edituser_component_1 = require("./dashboard/user/edit/edituser.component");
var addadmin_component_1 = require("./dashboard/admin/add/addadmin.component");
var editadmin_component_1 = require("./dashboard/admin/edit/editadmin.component");
var APP_ROUTES = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard/sa', component: superadmin_component_1.SuperAdminComponent },
    { path: 'dashboard/admin', component: admin_component_1.AdminComponent },
    { path: 'dashboard/usr', component: user_component_1.UserComponent },
    { path: 'add/user', component: adduser_component_1.AddUserComponent },
    { path: 'add/admin', component: addadmin_component_1.AddAdminComponent },
    { path: 'edit/user/:id', component: edituser_component_1.EditUserComponent },
    { path: 'edit/admin/:id', component: editadmin_component_1.EditAdminComponent },
    { path: 'login', component: login_component_1.LoginComponent }
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routing.js.map