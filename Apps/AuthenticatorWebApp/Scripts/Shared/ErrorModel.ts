export class ErrorModel implements IErrorModel {
    constructor(public readonly Message: string, public readonly Source: string = '', public readonly context?: any) {
    }

    toString() {
        let str = '';
        if (this.Source) {
            str += `${this.Source}, `;
        }
        str += this.Message;
        return str;
    }
}