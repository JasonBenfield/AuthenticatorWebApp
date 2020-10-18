import numeral = require("numeral");

export class FormattedNumber {
    constructor(value: number, format: string) {
        this.formatted = numeral(value).format(format);
    }

    private readonly formatted: string;

    toString() {
        return this.formatted;
    }
}