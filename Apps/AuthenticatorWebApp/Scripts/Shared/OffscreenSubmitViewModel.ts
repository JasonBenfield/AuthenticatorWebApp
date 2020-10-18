import { ComponentTemplate } from './ComponentTemplate';
import * as ko from 'knockout';
import * as template from './Templates/OffscreenSubmit.html';

export class OffscreenSubmitViewModel {
    constructor() {
        new ComponentTemplate(this.template(), template).register();
    }
    readonly template = ko.observable('offscreen-submit');
}