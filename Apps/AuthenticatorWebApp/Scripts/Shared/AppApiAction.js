"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppApiAction = void 0;
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
            var model, jsonText, postResult, result, apiError, errors, rawErrors, message;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof data === 'string' || typeof data === 'number' || data instanceof Date) {
                            model = { model: data };
                        }
                        else {
                            model = data;
                        }
                        jsonText = new JsonText_1.JsonText(model).toString();
                        return [4 /*yield*/, new HttpClient_1.HttpClient().post(this.resourceUrl.url.getUrl(), jsonText)];
                    case 1:
                        postResult = _a.sent();
                        result = postResult && postResult.result && postResult.result.Data;
                        if (!postResult.isSuccessful()) {
                            errors = [];
                            if (result) {
                                rawErrors = result;
                                errors = new Enumerable_1.MappedArray(rawErrors, function (e) { return new ErrorModel_1.ErrorModel(e.Message, e.Source); }).value();
                            }
                            else if (postResult.status === 404) {
                                errors = [new ErrorModel_1.ErrorModel('Not Found', '', this)];
                            }
                            else if (postResult.status === 401) {
                                errors = [new ErrorModel_1.ErrorModel('Not Authenticated', '', this)];
                            }
                            else if (postResult.status === 403) {
                                errors = [new ErrorModel_1.ErrorModel('Not Authorized', '', this)];
                            }
                            else {
                                message = 'An error occurred';
                                if (postResult.status !== 500) {
                                    message += " (" + postResult.status + ")";
                                }
                                errors = [new ErrorModel_1.ErrorModel(message, '', this)];
                            }
                            apiError = new AppApiError_1.AppApiError(errors, postResult.status, this.friendlyName, errorOptions.caption || '');
                        }
                        if (apiError && !errorOptions.preventDefault) {
                            this.events.handleError(apiError);
                            throw new Error(apiError.getCaption());
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AppApiAction.prototype.toString = function () {
        return "AppApiAction " + this.resourceUrl;
    };
    return AppApiAction;
}());
exports.AppApiAction = AppApiAction;
//# sourceMappingURL=AppApiAction.js.map