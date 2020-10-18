import * as moment from 'moment';

export class FormattedDate {
    constructor(value: Date, format: string) {
        this.formatted = moment(value).format(format);
    }

    private readonly formatted: string;

    toString() {
        return this.formatted;
    }
}