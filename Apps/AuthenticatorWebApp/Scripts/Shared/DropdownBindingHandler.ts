import * as ko from 'knockout';
import { Dropdown } from 'bootstrap';
import * as $ from 'jquery';

export class DropdownBindingHandler implements ko.BindingHandler<any> {
    constructor() {
    }

    init(element: HTMLElement, valueAccessor: () => any) {
        let dropdown = new Dropdown(element);
        $(element).data('bs.dropdown', dropdown);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if (dropdown) {
                dropdown.dispose();
                dropdown = null;
            }
        })
    }
}