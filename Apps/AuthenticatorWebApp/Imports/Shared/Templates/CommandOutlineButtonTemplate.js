"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ComponentTemplate_1 = require("../ComponentTemplate");
var template = require("./CommandOutlineButton.html");
var Command_1 = require("../Command");
var CommandOutlineButtonTemplate = /** @class */ (function (_super) {
    tslib_1.__extends(CommandOutlineButtonTemplate, _super);
    function CommandOutlineButtonTemplate() {
        return _super.call(this, 'command-outline-button', template) || this;
    }
    return CommandOutlineButtonTemplate;
}(ComponentTemplate_1.ComponentTemplate));
exports.CommandOutlineButtonTemplate = CommandOutlineButtonTemplate;
function createCommandOutlineButtonViewModel() {
    var commandVM = new Command_1.CommandViewModel();
    new CommandOutlineButtonTemplate().register();
    commandVM.componentName('command-outline-button');
    return commandVM;
}
exports.createCommandOutlineButtonViewModel = createCommandOutlineButtonViewModel;
//# sourceMappingURL=CommandOutlineButtonTemplate.js.map