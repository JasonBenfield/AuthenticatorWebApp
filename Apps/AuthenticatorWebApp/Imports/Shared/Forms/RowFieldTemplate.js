"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentTemplate_1 = require("../ComponentTemplate");
var template = require("./RowField.html");
var RowFieldTemplate = /** @class */ (function () {
    function RowFieldTemplate() {
        this.componentName = 'row-field';
    }
    RowFieldTemplate.prototype.register = function () {
        new ComponentTemplate_1.ComponentTemplate(this.componentName, template).register();
    };
    return RowFieldTemplate;
}());
exports.RowFieldTemplate = RowFieldTemplate;
//# sourceMappingURL=RowFieldTemplate.js.map