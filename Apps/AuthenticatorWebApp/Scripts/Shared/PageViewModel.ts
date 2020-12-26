import { ComponentTemplate } from './ComponentTemplate';
import * as ko from 'knockout';

export class PageViewModel {
    constructor(template: any) {
        new ComponentTemplate(this.componentName(), template).register();
    }

    readonly componentName = ko.observable('page-body');
}