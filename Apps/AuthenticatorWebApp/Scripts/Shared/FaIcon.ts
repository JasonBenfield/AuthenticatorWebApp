import * as ko from 'knockout';
import { CssClass } from './CssClass';
import { ComponentTemplate } from './ComponentTemplate';
import * as template from './Templates/FaIcon.html';

export class FaIconViewModel {
    constructor() {
        new ComponentTemplate(this.templateName, template).register();
    }

    readonly templateName = 'fa-icon';
    readonly cssClass = ko.observable('');
    readonly isVisible = ko.observable(true);
}

export enum FaIconPrefix {
    solid,
    regular
}

export class FaIconNames {
    static readonly login = 'sign-in-alt';
    static readonly save = 'check';
    static readonly cancel = 'times';
}

export class FaIcon {
    constructor(
        private readonly vm: FaIconViewModel,
        private readonly name: string,
        private readonly prefix: FaIconPrefix = FaIconPrefix.solid) {
        this.cssClass.addNames(this.prefixCss(this.prefix), this.name);
        this.updateVmCssClass();
    }

    private prefixCss(prefix: FaIconPrefix) {
        let css: string;
        if (prefix === FaIconPrefix.regular) {
            css = 'far';
        }
        else if (prefix === FaIconPrefix.solid) {
            css = 'fas';
        }
        return css;
    }

    private readonly cssClass = new CssClass();

    changeName(name: string) {
        this.cssClass.removeName(this.name);
        this.cssClass.addName(name);
        this.updateVmCssClass();
    }

    updateVmCssClass() {
        this.vm.cssClass(this.cssClass.toString());
        this.vm.isVisible(Boolean(this.name));
    }
}