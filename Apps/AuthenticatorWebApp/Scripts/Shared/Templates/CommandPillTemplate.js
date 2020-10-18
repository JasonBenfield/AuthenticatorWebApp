"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommandPillViewModel = exports.CommandPillTemplate = void 0;
var tslib_1 = require("tslib");
var ComponentTemplate_1 = require("../ComponentTemplate");
var template = require("./CommandPill.html");
var Command_1 = require("../Command");
var CommandPillTemplate = /** @class */ (function (_super) {
    tslib_1.__extends(CommandPillTemplate, _super);
    function CommandPillTemplate() {
        return _super.call(this, 'command-pill', template) || this;
    }
    return CommandPillTemplate;
}(ComponentTemplate_1.ComponentTemplate));
exports.CommandPillTemplate = CommandPillTemplate;
function createCommandPillViewModel() {
    var commandVM = new Command_1.CommandViewModel();
    new CommandPillTemplate().register();
    commandVM.template('command-pill');
    return commandVM;
}
exports.createCommandPillViewModel = createCommandPillViewModel;
//# sourceMappingURL=CommandPillTemplate.js.map