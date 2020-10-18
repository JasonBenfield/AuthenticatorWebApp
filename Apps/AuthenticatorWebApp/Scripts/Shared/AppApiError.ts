import { ErrorModel } from "./ErrorModel";
import { JoinedStrings } from "./JoinedStrings";
import { MappedArray } from './Enumerable';

export class AppApiError {
    constructor(
        errors: IErrorModel[],
        private readonly _status: number,
        private readonly _location: string,
        private readonly _caption: string
    ) {
        this._errors = new MappedArray(errors, e => new ErrorModel(e.Message, e.Source)).value();
    }

    private readonly _errors: ErrorModel[];

    getErrors() {
        return this._errors;
    }

    isValidationError() {
        return this._status === 400;
    }

    isAuthenticationError() {
        return this._status === 401;
    }

    isCanceled() {
        return this._status === 999;
    }

    getCaption() {
        return this._caption || `Unable to ${this._location}`;
    }

    toString() {
        let caption = this.getCaption();
        let joined = new JoinedStrings('\n', this.getErrors()).toString();
        return `${caption}\nstatus: ${this._status}\n${joined}`;
    }
}