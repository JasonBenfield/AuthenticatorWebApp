"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = exports.HttpPostResult = void 0;
var HttpPostResult = /** @class */ (function () {
    function HttpPostResult(result, url, status, responseText) {
        this.result = result;
        this.url = url;
        this.status = status;
        this.responseText = responseText;
    }
    HttpPostResult.prototype.isSuccessful = function () {
        return this.status === 200;
    };
    HttpPostResult.prototype.toString = function () {
        return this.url + "\r\n" + this.status + "\r\n" + this.responseText + "\r\n" + this.result;
    };
    return HttpPostResult;
}());
exports.HttpPostResult = HttpPostResult;
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (url) {
        return this.execute('GET', url);
    };
    HttpClient.prototype.post = function (url, data) {
        return this.execute('POST', url, data);
    };
    HttpClient.prototype.execute = function (method, url, body) {
        return new Promise(function (resolve) {
            function reqListener() {
                console.log(this.responseText);
            }
            var oReq = new XMLHttpRequest();
            oReq.withCredentials = true;
            oReq.onreadystatechange = function () {
                if (oReq.readyState == 4) {
                    var result = void 0;
                    if (method === 'GET') {
                        result = oReq.responseText;
                    }
                    else if (!/^\s*[{\[]\s*.*[\]}]\s*$/.test(oReq.responseText)) {
                        var responseText = oReq.responseText;
                        if (!responseText) {
                            responseText = 'null';
                        }
                        responseText = "{ \"data\": " + responseText + " }";
                        var dataResult = JSON.parse(responseText);
                        result = dataResult.data;
                    }
                    else {
                        result = JSON.parse(oReq.responseText);
                    }
                    resolve(new HttpPostResult(result, url, oReq.status, oReq.responseText));
                }
            };
            oReq.addEventListener("load", reqListener.bind(oReq));
            oReq.open(method, url);
            if (method === 'POST') {
                oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            }
            oReq.send(body);
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map