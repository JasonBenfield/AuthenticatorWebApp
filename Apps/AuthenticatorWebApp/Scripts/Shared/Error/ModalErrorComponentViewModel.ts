import * as ko from 'knockout';
import * as template from './ModalErrorComponent.html';
import { ComponentTemplate } from '../ComponentTemplate';
import { ModalOptionsViewModel } from '../ModalOptionsViewModel';
import { ModalErrorViewModel } from './ModalErrorViewModel';
import { createCommandButtonViewModel } from "../Templates/CommandButtonTemplate";
import { singleton } from 'tsyringe';

@singleton()
export class ModalErrorComponentViewModel {
    constructor() {
        new ComponentTemplate(this.componentName(), template).register();
    }

    readonly componentName = ko.observable('modal-error-component');
    readonly title = ko.observable('');
    readonly isVisible = ko.observable(false);
    readonly modalOptions = new ModalOptionsViewModel();
    readonly errors = ko.observableArray<ModalErrorViewModel>([]);
    readonly okCommand = createCommandButtonViewModel();
}