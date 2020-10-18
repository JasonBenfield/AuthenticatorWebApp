import * as ko from 'knockout';

export class ContextualClassViewModel {
    readonly isDefault = ko.observable(false);
    readonly isSuccess = ko.observable(false);
    readonly isInfo = ko.observable(false);
    readonly isWarning = ko.observable(false);
    readonly isDanger = ko.observable(false);
    readonly isPrimary = ko.observable(false);
    readonly isSecondary = ko.observable(false);
    readonly isLight = ko.observable(false);
    readonly isDark = ko.observable(false);
}


export class ContextualClassNames {
    static readonly default = 'default';
    static readonly success = 'success';
    static readonly info = 'info';
    static readonly warning = 'warning';
    static readonly danger = 'danger';
    static readonly primary = 'primary';
    static readonly secondary = 'secondary';
    static readonly light = 'light';
    static readonly dark = 'dark';
}

export class ContextualClass {
    static default(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.default); }
    static success(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.success); }
    static info(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.info); }
    static warning(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.warning); }
    static danger(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.danger); }
    static primary(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.primary); }
    static secondary(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.secondary); }
    static light(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.light); }
    static dark(vm: ContextualClassViewModel) { return new ContextualClass(vm, ContextualClassNames.dark); }

    private constructor(private readonly vm: ContextualClassViewModel, private readonly value: string) {
        this.vm.isDefault(this.equals(ContextualClassNames.default));
        this.vm.isSuccess(this.equals(ContextualClassNames.success));
        this.vm.isInfo(this.equals(ContextualClassNames.info));
        this.vm.isWarning(this.equals(ContextualClassNames.warning));
        this.vm.isDanger(this.equals(ContextualClassNames.danger));
        this.vm.isPrimary(this.equals(ContextualClassNames.primary));
        this.vm.isSecondary(this.equals(ContextualClassNames.secondary));
        this.vm.isLight(this.equals(ContextualClassNames.light));
        this.vm.isDark(this.equals(ContextualClassNames.dark));
    }

    equals(other: ContextualClass | string) {
        if (other) {
            if (typeof other === 'string') {
                return this.value === other;
            }
            return this.value === other.value;
        }
        return false;
    }

    toString() {
        return this.value;
    }
}