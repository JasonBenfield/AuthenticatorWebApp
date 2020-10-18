import { NamedValue } from "./NamedValue";
import * as _ from 'lodash';
import { FormattedDate } from "./FormattedDate";
import { JoinedStrings } from "./JoinedStrings";

export class UrlQuery {
    constructor(query: string) {
        if (query) {
            this.pushQueryValues(query);
        }
    }

    private readonly queryValues: NamedValue[] = [];

    getValues() {
        return this.queryValues;
    }

    getValue(name: string) {
        let queryValue = _(this.queryValues).find(qv => qv.name === name);
        return queryValue ? queryValue.value : null;
    }

    private pushQueryValues(query: string) {
        let parts = query.split('&');
        _(parts).forEach(part => {
            let nameValue = part.split('=');
            let name = nameValue[0];
            let value = '';
            if (nameValue[1]) {
                value = nameValue[1];
            }
            this.queryValues.push(new NamedValue(name, value));
        });
    }

    clear() {
        this.queryValues.splice(0, this.queryValues.length);
        return this;
    }

    hasQuery(name: string) {
        let queryValue = _(this.queryValues).find(qv => qv.name === name);
        return Boolean(queryValue);
    }

    removeQuery(name: string) {
        for (let i = this.queryValues.length - 1; i >= 0; i--) {
            let queryPart = this.queryValues[i];
            if (queryPart.name === name) {
                this.queryValues.splice(i, 1);
            }
        }
        return this;
    }

    replaceQuery(name: string, value: string[]);
    replaceQuery(name: string, value: string);
    replaceQuery(name: string, value: Date);
    replaceQuery(name: string, value: number);
    replaceQuery(name: string, value: any) {
        this.removeQuery(name);
        return this.addQuery(name, value);
    }

    addQuery(name: string, value: string[]);
    addQuery(name: string, value: string);
    addQuery(name: string, value: Date);
    addQuery(name: string, value: number);
    addQuery(name: string, value: any) {
        if (name) {
            if (value instanceof Date) {
                let queryValue = value === undefined || value === null
                    ? null
                    : new FormattedDate(value, 'MM/dd/yyyy HH:mm:ss?').toString();
                this.queryValues.push(new NamedValue(name, queryValue));
            }
            else if (typeof value === 'string') {
                let queryValue: string;
                if (value !== undefined && value !== null) {
                    queryValue = value;
                }
                this.queryValues.push(new NamedValue(name, queryValue));
            }
            else if (typeof value === 'number') {
                let queryValue: string;
                if (value !== undefined && value !== null) {
                    queryValue = value.toString();
                }
                this.queryValues.push(new NamedValue(name, queryValue));
            }
            else if (_.isArray(value)) {
                _(value).forEach(arrValue => {
                    this.addQuery(name, arrValue);
                });
            }
            else {
                this.queryValues.push(new NamedValue(name, value && value.toString()));
            }
        }
        return this;
    }

    addQueryFromObject(obj: any) {
        return this._addQueryFromObject(obj, '');
    }

    private _addQueryFromObject(obj: any, prefix: string) {
        if (obj) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    let k = prefix ? `${prefix}[${prop}]` : prop;
                    let propValue = obj[prop];
                    if (propValue !== null && typeof propValue === "object") {
                        this._addQueryFromObject(propValue, k)
                    }
                    else {
                        this.addQuery(k, propValue);
                    }
                }
            }
        }
    }

    addQueryString(query: string) {
        if (query) {
            this.pushQueryValues(query);
        }
        return this;
    }

    toString() {
        let str = '';
        if (this.queryValues.length > 0) {
            str = new JoinedStrings('&', this.queryValues).value();
        }
        return str;
    }
}