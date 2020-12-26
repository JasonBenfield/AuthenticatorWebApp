import * as ko from 'knockout';
import * as _ from 'lodash';
import { ContextualClass, ContextualClassViewModel } from './ContextualClass';
import * as template from './Templates/Alert.html';
import { ComponentTemplate } from './ComponentTemplate';

export class AlertViewModel {
    constructor() {
        new ComponentTemplate(this.componentName(), template).register();
    }

    readonly componentName = ko.observable('alert');

    readonly contextualClass = new ContextualClassViewModel();

    readonly message = ko.observable('');

    readonly hasMessage = ko.pureComputed(() => Boolean(this.message()));

    readonly hasSuccessMessage = ko.pureComputed(() => {
        let hasMessage = this.hasMessage();
        let isSuccess = this.contextualClass.isSuccess();
        return hasMessage && isSuccess;
    });
    readonly hasInfoMessage = ko.pureComputed(() => {
        let hasMessage = this.hasMessage();
        let isInfo = this.contextualClass.isInfo();
        return hasMessage && isInfo;
    });
    readonly hasWarningMessage = ko.pureComputed(() => {
        let hasMessage = this.hasMessage();
        let isWarning = this.contextualClass.isWarning();
        return hasMessage && isWarning;
    });
    readonly hasDangerMessage = ko.pureComputed(() => {
        let hasMessage = this.hasMessage();
        let isDanger = this.contextualClass.isDanger();
        return hasMessage && isDanger;
    });
}

export class Alert {
    constructor(private readonly vm: AlertViewModel) {
    }

    clear() {
        this.setMessage('');
    }

    success(message: string) {
        ContextualClass.success(this.vm.contextualClass);
        this.setMessage(message);
    }

    info(message: string) {
        ContextualClass.info(this.vm.contextualClass);
        this.setMessage(message);
    }

    async infoAction(message: string, a: () => Promise<any>) {
        this.info(message);
        try {
            await a();
        }
        finally {
            this.clear();
        }
    }

    warning(message: string) {
        ContextualClass.warning(this.vm.contextualClass);
        this.setMessage(message);
    }

    danger(message: string) {
        ContextualClass.danger(this.vm.contextualClass);
        this.setMessage(message);
    }

    private setMessage(message: string) {
        message = _.trim(message);
        if (message) {
            this.vm.message(message);
        }
        this.debouncedSetMessage(message);
    }

    private debouncedSetMessage = _.debounce((message: string) => {
        this.vm.message(message);
    }, 500);
}