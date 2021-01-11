"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentTemplate_1 = require("../ComponentTemplate");
var template = require("./RowFieldValue.html");
var RowFieldValueTemplate = /** @class */ (function () {
    function RowFieldValueTemplate() {
        this.componentName = 'row-field-value';
    }
    RowFieldValueTemplate.prototype.register = function () {
        new ComponentTemplate_1.ComponentTemplate(this.componentName, template).register();
    };
    return RowFieldValueTemplate;
}());
exports.RowFieldValueTemplate = RowFieldValueTemplate;
//# sourceMappingURL=RowFieldValueTemplate.js.map