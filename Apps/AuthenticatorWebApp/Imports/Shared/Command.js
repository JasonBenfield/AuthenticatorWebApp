"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ko = require("knockout");
var Events_1 = require("./Events");
var FaIcon_1 = require("./FaIcon");
var ContextualClass_1 = require("./ContextualClass");
var CommandViewModel = /** @class */ (function () {
    function CommandViewModel() {
        this.componentName = ko.observable('');
        this.isVisible = ko.observable(true);
        this.isEnabled = ko.observable(true);
        this.icon = new FaIcon_1.FaIconViewModel();
        this.text = ko.observable('');
        this.textCss = ko.observable('');
        this.title = ko.observable('');
        this.isActive = ko.observable(false);
        this.contextualClass = new ContextualClass_1.ContextualClassViewModel();
        this._executeRequested = new Events_1.DefaultEvent(this);
        this.executeRequested = new Events_1.DefaultEventHandler(this._executeRequested);
    }
    CommandViewModel.prototype.requestExecute = function (context) {
        this._executeRequested.invoke(context);
    };
    return CommandViewModel;
}());
exports.CommandViewModel = CommandViewModel;
var CommandCollectionViewModel = /** @class */ (function () {
    function CommandCollectionViewModel(commands) {
        var _this = this;
        this.commands = commands;
        this._executeRequested = new Events_1.DefaultEvent(this);
        this.executeRequested = new Events_1.DefaultEventHandler(this._executeRequested);
        for (var prop in commands) {
            if (commands.hasOwnProperty(prop)) {
                commands[prop].executeRequested.register(function (data) {
                    _this._executeRequested.invoke(data);
                });
            }
        }
    }
    return CommandCollectionViewModel;
}());
exports.CommandCollectionViewModel = CommandCollectionViewModel;
var AsyncCommand = /** @class */ (function () {
    function AsyncCommand(vm, action) {
        var _this = this;
        this.action = action;
        this.isMultiExecutionAllowed = false;
        this.isEnabled = true;
        this.executionCount = 0;
        this.icons = {};
        if (vm instanceof CommandViewModel) {
            this.vm = new CommandCollectionViewModel({ default: vm });
        }
        else {
            this.vm = vm;
        }
        this.vm.executeRequested.register(function (context) { return _this.execute(context); });
        this.forEachCommand(function (c) {
            ContextualClass_1.ContextualClass.default(c.contextualClass);
            c.textCss('ms-1');
        });
        for (var prop in this.vm.commands) {
            if (this.vm.commands.hasOwnProperty(prop)) {
                this.icons[prop] = new FaIcon_1.FaIcon(this.vm.commands[prop].icon, '');
            }
        }
    }
    AsyncCommand.prototype.icon = function (name) {
        if (name === void 0) { name = 'default'; }
        return this.icons[name];
    };
    AsyncCommand.prototype.positionIconRight = function () {
        this.forEachCommand(function (c) { return c.textCss('me-1 float-start'); });
    };
    AsyncCommand.prototype.positionIconRightFor = function (name) {
        this.vm.commands[name].textCss('me-1 float-start');
    };
    AsyncCommand.prototype.setText = function (text) {
        this.forEachCommand(function (c) { return c.text(text); });
    };
    AsyncCommand.prototype.setTextFor = function (name, text) {
        this.vm.commands[name].text(text);
    };
    AsyncCommand.prototype.setTitle = function (text) {
        this.forEachCommand(function (c) { return c.title(text); });
    };
    AsyncCommand.prototype.setTitleFor = function (name, title) {
        this.vm.commands[name].title(title);
    };
    AsyncCommand.prototype.makePrimary = function () {
        this.forEachCommand(function (c) { return ContextualClass_1.ContextualClass.primary(c.contextualClass); });
    };
    AsyncCommand.prototype.makePrimaryFor = function (name) {
        ContextualClass_1.ContextualClass.primary(this.vm.commands[name].contextualClass);
    };
    AsyncCommand.prototype.makeSecondary = function () {
        this.forEachCommand(function (c) { return ContextualClass_1.ContextualClass.secondary(c.contextualClass); });
    };
    AsyncCommand.prototype.makeSecondaryFor = function (name) {
        ContextualClass_1.ContextualClass.secondary(this.vm.commands[name].contextualClass);
    };
    AsyncCommand.prototype.makeLight = function () {
        this.forEachCommand(function (c) { return ContextualClass_1.ContextualClass.light(c.contextualClass); });
    };
    AsyncCommand.prototype.makeLightFor = function (name) {
        ContextualClass_1.ContextualClass.light(this.vm.commands[name].contextualClass);
    };
    AsyncCommand.prototype.makeDark = function () {
        this.forEachCommand(function (c) { return ContextualClass_1.ContextualClass.dark(c.contextualClass); });
    };
    AsyncCommand.prototype.makeDarkFor = function (name) {
        ContextualClass_1.ContextualClass.dark(this.vm.commands[name].contextualClass);
    };
    AsyncCommand.prototype.makeDanger = function () {
        this.forEachCommand(function (c) { return ContextualClass_1.ContextualClass.danger(c.contextualClass); });
    };
    AsyncCommand.prototype.makeDangerFor = function (name) {
        ContextualClass_1.ContextualClass.danger(this.vm.commands[name].contextualClass);
    };
    AsyncCommand.prototype.setActive = function () {
        this.forEachCommand(function (c) { return c.isActive(true); });
    };
    AsyncCommand.prototype.setInactive = function () {
        this.forEachCommand(function (c) { return c.isActive(false); });
    };
    AsyncCommand.prototype.allowMultiExecution = function () {
        this.isMultiExecutionAllowed = true;
    };
    AsyncCommand.prototype.show = function () {
        this.forEachCommand(function (c) { return c.isVisible(true); });
    };
    AsyncCommand.prototype.hide = function () {
        this.forEachCommand(function (c) { return c.isVisible(false); });
    };
    AsyncCommand.prototype.enable = function () {
        this.isEnabled = true;
        this.updateIsEnabled();
    };
    AsyncCommand.prototype.disable = function () {
        this.updateIsEnabled();
    };
    AsyncCommand.prototype.updateIsEnabled = function () {
        var isEnabled = this.isEnabled && this.executionCount === 0;
        this.forEachCommand(function (c) { return c.isEnabled(isEnabled); });
    };
    AsyncCommand.prototype.forEachCommand = function (action) {
        for (var prop in this.vm.commands) {
            if (this.vm.commands.hasOwnProperty(prop)) {
                action(this.vm.commands[prop]);
            }
        }
    };
    AsyncCommand.prototype.execute = function (context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var canExecute;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canExecute = this.canExecute();
                        if (!canExecute) return [3 /*break*/, 4];
                        this.executionCount++;
                        this.updateIsEnabled();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, this.action(context)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.executionCount--;
                        this.updateIsEnabled();
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AsyncCommand.prototype.canExecute = function () {
        return this.isEnabled && (this.isMultiExecutionAllowed || this.executionCount === 0);
    };
    return AsyncCommand;
}());
exports.AsyncCommand = AsyncCommand;
var Command = /** @class */ (function (_super) {
    tslib_1.__extends(Command, _super);
    function Command(vm, action) {
        return _super.call(this, vm, function (c) {
            return new Promise(function (resolve, reject) {
                try {
                    action(c);
                    resolve({});
                }
                catch (e) {
                    reject(e);
                }
            });
        }) || this;
    }
    return Command;
}(AsyncCommand));
exports.Command = Command;
//# sourceMappingURL=Command.js.map