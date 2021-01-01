"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var ComponentTemplateAsync = /** @class */ (function () {
    function ComponentTemplateAsync(name, url) {
        this.name = name;
        this.url = url;
    }
    ComponentTemplateAsync.prototype.register = function () {
        if (!ko.components.isRegistered(this.name)) {
            ko.components.register(this.name, {
                template: {
                    templateUrl: this.url
                }
            });
        }
    };
    return ComponentTemplateAsync;
}());
exports.ComponentTemplateAsync = ComponentTemplateAsync;
//# sourceMappingURL=ComponentTemplateAsync.js.map