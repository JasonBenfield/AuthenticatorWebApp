"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLoader = void 0;
var ko = require("knockout");
var template = require("./Templates/PageFrame.html");
require("./Styles/default.scss");
var ComponentTemplate_1 = require("./ComponentTemplate");
require("tslib");
var SubmitBindingHandler_1 = require("./SubmitBindingHandler");
var ModalBindingHandler_1 = require("./ModalBindingHandler");
var tsyringe_1 = require("tsyringe");
var PageFrameViewModel_1 = require("./PageFrameViewModel");
var PageLoader = /** @class */ (function () {
    function PageLoader() {
    }
    PageLoader.prototype.load = function () {
        new ComponentTemplate_1.ComponentTemplate('page-frame', template).register();
        ko.options.deferUpdates = true;
        ko.bindingHandlers.submit = new SubmitBindingHandler_1.SubmitBindingHandler();
        ko.bindingHandlers.modal = new ModalBindingHandler_1.ModalBindingHandler();
        var page = tsyringe_1.container.resolve('Page');
        var pageFrameVM = tsyringe_1.container.resolve(PageFrameViewModel_1.PageFrameViewModel);
        ko.applyBindings(pageFrameVM);
    };
    return PageLoader;
}());
exports.PageLoader = PageLoader;
//# sourceMappingURL=PageLoader.js.map