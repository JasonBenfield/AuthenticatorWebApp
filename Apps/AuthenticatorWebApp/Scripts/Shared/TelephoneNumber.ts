import { FormattedNumber } from "./FormattedNumber";

export class TelephoneNumber {
    constructor(private readonly areaCode: number, private readonly prefix: number, private readonly lineNumber: number) {
    }

    toString() {
        let formattedAreaCode = new FormattedNumber(this.areaCode, '000');
        let formattedPrefix = new FormattedNumber(this.prefix, '000');
        let formattedLineNumber = new FormattedNumber(this.lineNumber, '0000');
        return `(${formattedAreaCode}) ${formattedPrefix}-${formattedLineNumber}`;
    }
}