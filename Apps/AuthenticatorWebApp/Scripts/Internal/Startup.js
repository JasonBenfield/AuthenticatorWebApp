"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startup = void 0;
var PageLoader_1 = require("XtiShared/PageLoader");
var AppApiEvents_1 = require("XtiShared/AppApiEvents");
var ConsoleLog_1 = require("XtiShared/ConsoleLog");
var ModalErrorComponent_1 = require("XtiShared/Error/ModalErrorComponent");
var tsyringe_1 = require("tsyringe");
var AuthenticatorAppApi_1 = require("../Authenticator/Api/AuthenticatorAppApi");
var AppApi_1 = require("XtiShared/AppApi");
var LogoutUrl_1 = require("../Authenticator/LogoutUrl");
function startup(pageVM, page) {
    tsyringe_1.container.register('PageVM', { useFactory: function (c) { return c.resolve(pageVM); } });
    tsyringe_1.container.register('Page', { useFactory: function (c) { return c.resolve(page); } });
    tsyringe_1.container.register(AppApiEvents_1.AppApiEvents, {
        useFactory: function (c) { return new AppApiEvents_1.AppApiEvents(function (err) {
            new ConsoleLog_1.ConsoleLog().error(err.toString());
            c.resolve(ModalErrorComponent_1.ModalErrorComponent).show(err.getErrors(), err.getCaption());
        }); }
    });
    tsyringe_1.container.register(AuthenticatorAppApi_1.AuthenticatorAppApi, {
        useFactory: function (c) { return new AuthenticatorAppApi_1.AuthenticatorAppApi(c.resolve(AppApiEvents_1.AppApiEvents), location.protocol + "//" + location.host, 'Current'); }
    });
    tsyringe_1.container.register(AppApi_1.AppApi, { useFactory: function (c) { return c.resolve(AuthenticatorAppApi_1.AuthenticatorAppApi); } });
    tsyringe_1.container.register('LogoutUrl', {
        useToken: LogoutUrl_1.LogoutUrl
    });
    new PageLoader_1.PageLoader().load();
}
exports.startup = startup;
//# sourceMappingURL=Startup.js.map