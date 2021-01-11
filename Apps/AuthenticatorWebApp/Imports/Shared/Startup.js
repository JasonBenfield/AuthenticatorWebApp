"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageLoader_1 = require("./PageLoader");
var AppApiEvents_1 = require("./AppApiEvents");
var ConsoleLog_1 = require("./ConsoleLog");
var ModalErrorComponent_1 = require("./Error/ModalErrorComponent");
var tsyringe_1 = require("tsyringe");
function startup(pageVM, page) {
    tsyringe_1.container.register('PageVM', { useFactory: function (c) { return c.resolve(pageVM); } });
    tsyringe_1.container.register('Page', { useFactory: function (c) { return c.resolve(page); } });
    tsyringe_1.container.register(AppApiEvents_1.AppApiEvents, {
        useFactory: function (c) { return new AppApiEvents_1.AppApiEvents(function (err) {
            new ConsoleLog_1.ConsoleLog().error(err.toString());
            c.resolve(ModalErrorComponent_1.ModalErrorComponent).show(err.getErrors(), err.getCaption());
        }); }
    });
    new PageLoader_1.PageLoader().load();
}
exports.startup = startup;
//# sourceMappingURL=Startup.js.map