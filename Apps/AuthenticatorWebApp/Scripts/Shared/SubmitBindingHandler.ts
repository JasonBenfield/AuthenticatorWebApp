import * as ko from 'knockout';
import { CommandViewModel } from './Command';
import * as _ from 'lodash';

export class SubmitBindingHandler implements ko.BindingHandler {
    constructor() {
        this.init = this.init.bind(this);
    }

    init(element: HTMLElement, valueAccessor, allBindings, viewModel, bindingContext) {
        ko.utils.registerEventHandler(element, "submit", (event) => {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            _.delay(() => {
                let unwrapped = ko.utils.unwrapObservable<any>(valueAccessor());
                if (unwrapped instanceof CommandViewModel) {
                    unwrapped.requestExecute.call(unwrapped, element);
                }
                else if (_.isFunction(unwrapped)) {
                    unwrapped.call(unwrapped, element);
                }
            }, 300);
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                event.returnValue = false;
            }
        });
    }
}