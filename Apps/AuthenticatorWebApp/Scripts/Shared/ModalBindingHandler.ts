import * as ko from 'knockout';
import * as $ from 'jquery';
import { ModalOptionsViewModel } from './ModalOptionsViewModel';
import 'bootstrap';

export class ModalBindingHandler implements ko.BindingHandler<ModalOptionsViewModel> {
    constructor() {
    }

    init(element: any, valueAccessor: () => ModalOptionsViewModel) {
        $(element).on('hidden.bs.modal', function (e) {
            let options = ko.unwrap(valueAccessor());
            options.handleClose();
        })
    }

    update(element: any, valueAccessor: () => ModalOptionsViewModel) {
        let modal: any = $(element);
        let options = ko.unwrap(valueAccessor());
        let command = options.command();
        if (command) {
            modal.modal(command);
            options.command('');
        }
    }
}