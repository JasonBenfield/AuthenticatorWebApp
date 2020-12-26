"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommandButtonViewModel = exports.CommandButtonTemplate = void 0;
var tslib_1 = require("tslib");
var ComponentTemplate_1 = require("../ComponentTemplate");
var template = require("./CommandButton.html");
var Command_1 = require("../Command");
var CommandButtonTemplate = /** @class */ (function (_super) {
    tslib_1.__extends(CommandButtonTemplate, _super);
    function CommandButtonTemplate() {
        return _super.call(this, 'command-button', template) || this;
    }
    return CommandButtonTemplate;
}(ComponentTemplate_1.ComponentTemplate));
exports.CommandButtonTemplate = CommandButtonTemplate;
function createCommandButtonViewModel() {
    var commandVM = new Command_1.CommandViewModel();
    new CommandButtonTemplate().register();
    commandVM.componentName('command-button');
    return commandVM;
}
exports.createCommandButtonViewModel = createCommandButtonViewModel;
//# sourceMappingURL=CommandButtonTemplate.js.map