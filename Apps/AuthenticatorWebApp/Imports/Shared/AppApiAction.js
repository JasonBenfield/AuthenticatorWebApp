"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var HttpClient_1 = require("./HttpClient");
var JsonText_1 = require("./JsonText");
var AppApiError_1 = require("./AppApiError");
var ErrorModel_1 = require("./ErrorModel");
var Enumerable_1 = require("./Enumerable");
var AppApiAction = /** @class */ (function () {
    function AppApiAction(events, resourceUrl, actionName, friendlyName) {
        this.events = events;
        this.friendlyName = friendlyName;
        this.resourceUrl = resourceUrl.withAction(actionName);
    }
    AppApiAction.prototype.execute = function (data, errorOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var jsonText, postResult, result, apiError, errors, rawErrors, message;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsonText = new JsonText_1.JsonText(data).toString();
                        return [4 /*yield*/, new HttpClient_1.HttpClient().post(this.resourceUrl.url.getUrl(), jsonText)];
                    case 1:
                        postResult = _a.sent();
                        result = postResult && postResult.result && postResult.result.Data;
                        if (postResult.isSuccessful()) {
                            if (typeof result === 'string') {
                                if (AppApiAction.dateRegex.test(result)) {
                                    result = new Date(Date.parse(result));
                                }
                            }
                            else {
                                this.parseDates(result);
                            }
                        }
                        else {
                            errors = [];
                            if (result) {
                                rawErrors = result;
                                errors = new Enumerable_1.MappedArray(rawErrors, function (e) { return new ErrorModel_1.ErrorModel(e.Message, e.Caption, e.Source); }).value();
                            }
                            else if (postResult.status === 404) {
                                errors = [new ErrorModel_1.ErrorModel('Not Found', '', '', this)];
                            }
                            else if (postResult.status === 401) {
                                errors = [new ErrorModel_1.ErrorModel('Not Authenticated', '', '', this)];
                            }
                            else if (postResult.status === 403) {
                                errors = [new ErrorModel_1.ErrorModel('Not Authorized', '', '', this)];
                            }
                            else {
                                message = 'An error occurred';
                                if (postResult.status !== 500) {
                                    message += " (" + postResult.status + ")";
                                }
                                errors = [new ErrorModel_1.ErrorModel(message, '', '', this)];
                            }
                            apiError = new AppApiError_1.AppApiError(errors, postResult.status, this.friendlyName, errorOptions.caption || '');
                        }
                        if (apiError) {
                            if (!errorOptions.preventDefault) {
                                this.events.handleError(apiError);
                            }
                            throw apiError;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AppApiAction.prototype.parseDates = function (obj) {
        if (obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                for (var i = 0; i < obj.length; i++) {
                    var el = obj[i];
                    if (typeof el === 'string') {
                        if (AppApiAction.dateRegex.test(el)) {
                            obj[i] = new Date(Date.parse(el));
                        }
                    }
                    else {
                        this.parseDates(el);
                    }
                }
            }
            else if (typeof (obj) !== 'string' && typeof (obj) !== 'boolean' && typeof (obj) !== 'number') {
                for (var prop in obj) {
                    if (prop) {
                        var value = obj[prop];
                        if (typeof value === 'string') {
                            if (AppApiAction.dateRegex.test(value)) {
                                obj[prop] = new Date(Date.parse(value));
                            }
                        }
                        else {
                            this.parseDates(value);
                        }
                    }
                }
            }
        }
        return obj;
    };
    AppApiAction.prototype.toString = function () {
        return "AppApiAction " + this.resourceUrl;
    };
    AppApiAction.dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,7}\+\d{2}:\d{2}$/;
    return AppApiAction;
}());
exports.AppApiAction = AppApiAction;
//# sourceMappingURL=AppApiAction.js.map