import { Alert, AlertViewModel } from "./Alert";
import { SimpleEvent, DefaultEventHandler } from "./Events";
import * as ko from 'knockout';

export interface IAwaitableComponent {
    readonly isActive: boolean;
    readonly resizeRequired: IEventHandler<any>;
    activate(): Promise<any>;
    deactivate();
}

export class AwaitableComponentViewModel {
    readonly alert = new AlertViewModel();
    readonly title = ko.observable('');
    readonly isActive = ko.observable(false);
    readonly isInactive = ko.pureComputed(() => !this.isActive());
    readonly template = ko.observable('');
}

export class BaseComponentViewModel {
    readonly component = new AwaitableComponentViewModel();
    readonly alert = this.component.alert;
    readonly title = this.component.title;
    readonly isActive = this.component.isActive;
    readonly isInactive = this.component.isInactive;
    readonly template = this.component.template;
}

export class ComponentDeactivatedResult {
    private readonly name = 'ComponentDeactivatedResult';
}

export class AwaitableComponent<TResult> implements IAwaitableComponent {
    constructor(private readonly vm: AwaitableComponentViewModel) {
    }

    readonly alert = new Alert(this.vm.alert);

    private readonly _resizeRequired = new SimpleEvent(this);
    readonly resizeRequired = new DefaultEventHandler(this._resizeRequired);

    setTitle(title: string) {
        this.vm.title(title);
    }

    private _isActive = false;

    get isActive() {
        return this._isActive;
    }

    private _resolve: (value: TResult | ComponentDeactivatedResult) => void = null;

    isInProgress() {
        return this._resolve !== null;
    }

    resolveComponent(result: TResult | ComponentDeactivatedResult) {
        let resolve = this._resolve;
        this._resolve = null;
        if (resolve) {
            resolve(result);
        }
    }

    private readonly _activated = new SimpleEvent(this);
    readonly activated = new DefaultEventHandler(this._activated);

    activate() {
        if (!this._isActive) {
            this.setIsActivated(true);
            this._activated.invoke();
        }
        return new Promise<TResult | ComponentDeactivatedResult>((resolve) => {
            this._resolve = resolve;
        });
    }

    private readonly _deactivated = new SimpleEvent(this);
    readonly deactivated = new DefaultEventHandler(this._deactivated);

    deactivate() {
        let isActive = this._isActive;
        if (isActive) {
            this.setIsActivated(false);
            this._deactivated.invoke();
        }
    }

    private setIsActivated(isActivated: boolean) {
        this._isActive = isActivated;
        this.vm.isActive(this._isActive);
    }

    afterRender() {
        this._resizeRequired.invoke();
    }

    disposeComponent() {
        this._resizeRequired.dispose();
        this.deactivate();
        this._activated.dispose();
        this._deactivated.dispose();
        if (this.isInProgress()) {
            this.resolveComponent(new ComponentDeactivatedResult());
        }
    }
}

export class BaseComponent<TResult> implements IAwaitableComponent {
    constructor(private readonly componentVM: AwaitableComponentViewModel) {
    }

    protected readonly component = new AwaitableComponent<TResult>(this.componentVM);

    readonly isActive = this.component.isActive;
    readonly alert = this.component.alert;
    readonly resizeRequired = this.component.resizeRequired;
    readonly activated = this.component.activated;
    readonly deactivated = this.component.deactivated;

    activate() {
        return this.component.activate();
    }

    deactivate() {
        this.component.deactivate();
    }

    setTitle(title: string) {
        this.componentVM.title(title);
    }

    protected resolveComponent(result: TResult | ComponentDeactivatedResult) {
        this.component.resolveComponent(result);
    }

    disposeComponent() {
        this.component.disposeComponent();
    }
}
