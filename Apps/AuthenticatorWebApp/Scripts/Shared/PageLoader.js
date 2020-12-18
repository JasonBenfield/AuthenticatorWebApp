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
var UrlBuilder_1 = require("./UrlBuilder");
var ConsoleLog_1 = require("./ConsoleLog");
var PageLoader = /** @class */ (function () {
    function PageLoader() {
    }
    PageLoader.prototype.load = function () {
        var _this = this;
        var defaultConfigLoader = {
            getConfig: function (name, callback) {
                if (name.indexOf('/') > -1) {
                    callback({
                        template: { templateUrl: name },
                        synchronous: true
                    });
                }
                else {
                    callback(null);
                }
            }
        };
        var defaultComponentLoader = {
            loadComponent: function (name, config, callback) {
                var templateConfig = config.template;
                if (templateConfig.templateUrl) {
                    _this.loadFromTemplateUrl(templateConfig.templateUrl, callback, templateConfig.errorMarkup);
                }
                else if (templateConfig.containerID) {
                    var container_1 = document.getElementById(templateConfig.containerID);
                    callback({
                        template: container_1 && container_1.childNodes,
                        createViewModel: _this.createViewModel
                    });
                }
                else {
                    callback(null);
                }
            }
        };
        ko.components.loaders.unshift(defaultConfigLoader);
        ko.components.loaders.unshift(defaultComponentLoader);
        new ComponentTemplate_1.ComponentTemplate('page-frame', template).register();
        ko.options.deferUpdates = true;
        ko.bindingHandlers.submit = new SubmitBindingHandler_1.SubmitBindingHandler();
        ko.bindingHandlers.modal = new ModalBindingHandler_1.ModalBindingHandler();
        var page = tsyringe_1.container.resolve('Page');
        var pageFrameVM = tsyringe_1.container.resolve(PageFrameViewModel_1.PageFrameViewModel);
        ko.applyBindings(pageFrameVM);
    };
    PageLoader.prototype.createViewModel = function (params, componentInf) {
        return params;
    };
    PageLoader.prototype.loadFromTemplateUrl = function (templateUrl, callback, getErrorMarkup) {
        var _this = this;
        var urlBuilder = new UrlBuilder_1.UrlBuilder(templateUrl);
        if (!urlBuilder.hasQuery('cacheBust')) {
            urlBuilder.addQuery('cacheBust', pageContext.CacheBust);
        }
        var url = urlBuilder.getUrl();
        function reqListener() {
            console.log(this.responseText);
        }
        var oReq = new XMLHttpRequest();
        oReq.withCredentials = true;
        oReq.onreadystatechange = function () {
            if (oReq.readyState == 4) {
                if (oReq.status === 200) {
                    var template_1 = ko.utils.parseHtmlFragment(oReq.responseText);
                    callback({
                        template: template_1,
                        createViewModel: _this.createViewModel
                    });
                }
                else {
                    new ConsoleLog_1.ConsoleLog().error("Error loading " + url + "\r\nStatus: " + oReq.status + "\r\n" + oReq.responseText);
                    callback({
                        template: '',
                        createViewModel: function (params, componentInfo) {
                            return params;
                        }
                    });
                    ko.components.clearCachedDefinition(templateUrl);
                }
            }
        };
        oReq.addEventListener("load", reqListener.bind(oReq));
        oReq.open('GET', url);
        oReq.setRequestHeader("cache-control", "private");
        oReq.send('');
    };
    return PageLoader;
}());
exports.PageLoader = PageLoader;
//# sourceMappingURL=PageLoader.js.map