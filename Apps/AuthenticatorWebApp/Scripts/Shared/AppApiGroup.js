"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppApiGroup = void 0;
var AppApiAction_1 = require("./AppApiAction");
var AppApiView_1 = require("./AppApiView");
var AppApiGroup = /** @class */ (function () {
    function AppApiGroup(events, resourceUrl, name) {
        this.events = events;
        this.name = name;
        this.resourceUrl = resourceUrl.withGroup(name);
    }
    AppApiGroup.prototype.createView = function (name) {
        return new AppApiView_1.AppApiView(this.resourceUrl, name);
    };
    AppApiGroup.prototype.createAction = function (name, friendlyName) {
        return new AppApiAction_1.AppApiAction(this.events, this.resourceUrl, name, friendlyName);
    };
    AppApiGroup.prototype.toString = function () {
        return "AppApiGroup " + this.resourceUrl;
    };
    return AppApiGroup;
}());
exports.AppApiGroup = AppApiGroup;
//# sourceMappingURL=AppApiGroup.js.map