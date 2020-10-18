import * as ko from 'knockout';
import * as template from './Templates/PageFrame.html';
import './Styles/default.scss';
import { ComponentTemplate } from './ComponentTemplate';
import 'tslib';
import { SubmitBindingHandler } from './SubmitBindingHandler';
import { ModalBindingHandler } from './ModalBindingHandler';
import { container } from 'tsyringe';
import { PageFrameViewModel } from './PageFrameViewModel';

export class PageLoader {
    load() {
        new ComponentTemplate('page-frame', template).register();
        ko.options.deferUpdates = true;
        ko.bindingHandlers.submit = new SubmitBindingHandler();
        ko.bindingHandlers.modal = new ModalBindingHandler();
        let page = container.resolve('Page');
        let pageFrameVM = container.resolve(PageFrameViewModel);
        ko.applyBindings(pageFrameVM);
    }
}