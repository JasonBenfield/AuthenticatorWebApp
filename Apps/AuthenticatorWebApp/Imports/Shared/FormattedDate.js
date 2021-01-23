"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormattedDate = /** @class */ (function () {
    function FormattedDate(value, options) {
        this.value = value;
        this.dateOptions = { month: 'numeric', day: 'numeric', year: '2-digit' };
        this.timeOptions = { hour: 'numeric', minute: '2-digit' };
        if (options) {
            this.dateOptions.day = options.day;
            this.dateOptions.weekday = options.weekday;
            this.dateOptions.year = options.year;
            this.dateOptions.month = options.month;
            this.timeOptions.hour = options.hour;
            this.timeOptions.hour12 = options.hour12;
            this.timeOptions.minute = options.minute;
            this.timeOptions.second = options.second;
            this.timeOptions.timeZone = options.timeZone;
            this.timeOptions.timeZoneName = options.timeZoneName;
        }
    }
    FormattedDate.prototype.formatDate = function () {
        return this.value ? this.value.toLocaleDateString([], this.dateOptions) : '';
    };
    FormattedDate.prototype.formatTime = function () {
        return this.value ? this.value.toLocaleTimeString([], this.timeOptions) : '';
    };
    FormattedDate.prototype.formatDateTime = function () {
        if (this.value) {
            if (this.value.getHours() === 0 &&
                this.value.getMinutes() === 0 &&
                this.value.getSeconds() === 0 &&
                this.value.getMilliseconds() === 0) {
                return this.formatDate();
            }
            return this.formatDate() + ' ' + this.formatTime();
        }
        return '';
    };
    FormattedDate.prototype.toString = function () {
        return this.formatDateTime();
    };
    return FormattedDate;
}());
exports.FormattedDate = FormattedDate;
//# sourceMappingURL=FormattedDate.js.map