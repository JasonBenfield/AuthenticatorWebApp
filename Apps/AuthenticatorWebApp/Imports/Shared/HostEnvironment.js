"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tsyringe_1 = require("tsyringe");
var HostEnvironment = /** @class */ (function () {
    function HostEnvironment() {
        this.isTest = pageContext.EnvironmentName === 'Test';
        this.isDevelopment = pageContext.EnvironmentName === 'Development';
        this.isStaging = pageContext.EnvironmentName === 'Staging';
        this.isProduction = pageContext.EnvironmentName === 'Production';
    }
    HostEnvironment = tslib_1.__decorate([
        tsyringe_1.singleton(),
        tslib_1.__metadata("design:paramtypes", [])
    ], HostEnvironment);
    return HostEnvironment;
}());
exports.HostEnvironment = HostEnvironment;
//# sourceMappingURL=HostEnvironment.js.map