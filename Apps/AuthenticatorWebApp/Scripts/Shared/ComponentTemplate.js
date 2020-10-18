"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentTemplate = void 0;
var ko = require("knockout");
var ComponentTemplate = /** @class */ (function () {
    function ComponentTemplate(name, html) {
        this.name = name;
        this.html = html;
    }
    ComponentTemplate.prototype.register = function () {
        if (!ko.components.isRegistered(this.name)) {
            ko.components.register(this.name, { template: this.html });
        }
    };
    return ComponentTemplate;
}());
exports.ComponentTemplate = ComponentTemplate;
//# sourceMappingURL=ComponentTemplate.js.map