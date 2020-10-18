import * as ko from 'knockout';
import { ErrorModel } from '../ErrorModel';

export class ModalErrorViewModel {
    constructor(errors: ErrorModel[], caption: string) {
        this.errors(errors);
        this.caption(caption);
    }

    readonly errors = ko.observableArray([]);
    readonly caption = ko.observable('');
}