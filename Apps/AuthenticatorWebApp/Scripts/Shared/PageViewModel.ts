import { ComponentTemplate } from './ComponentTemplate';
import * as ko from 'knockout';

export class PageViewModel {
    constructor(template: any) {
        new ComponentTemplate(this.template(), template).register();
    }

    readonly template = ko.observable('page-body');
}