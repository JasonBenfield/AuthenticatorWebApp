import * as ko from 'knockout';
import { DefaultEvent, DefaultEventHandler } from './Events';
import { FaIconViewModel, FaIcon } from './FaIcon';
import { ContextualClass, ContextualClassViewModel } from './ContextualClass';

export class CommandViewModel {
    readonly template = ko.observable('');
    readonly isVisible = ko.observable(true);
    readonly isEnabled = ko.observable(true);
    readonly icon = new FaIconViewModel();
    readonly text = ko.observable('');
    readonly isActive = ko.observable(false);
    readonly contextualClass = new ContextualClassViewModel();

    private readonly _executeRequested = new DefaultEvent<any>(this);
    readonly executeRequested = new DefaultEventHandler(this._executeRequested);

    requestExecute(context: any) {
        this._executeRequested.invoke(context);
    }
}

export class CommandCollectionViewModel {
    constructor(readonly commands: {
        [name: string]: CommandViewModel
    }) {
        for (let prop in commands) {
            if (commands.hasOwnProperty(prop)) {
                commands[prop].executeRequested.register(data => {
                    this._executeRequested.invoke(data);
                });
            }
        }
    }

    private readonly _executeRequested = new DefaultEvent<any>(this);
    readonly executeRequested = new DefaultEventHandler(this._executeRequested);
}

export class AsyncCommand {
    constructor(
        vm: CommandViewModel | CommandCollectionViewModel,
        private readonly action: (context?: any) => any
    ) {
        if (vm instanceof CommandViewModel) {
            this.vm = new CommandCollectionViewModel({ default: vm });
        }
        else {
            this.vm = vm;
        }
        this.vm.executeRequested.register(context => this.execute(context));
        this.forEachCommand(c => ContextualClass.default(c.contextualClass));
        for (let prop in this.vm.commands) {
            if (this.vm.commands.hasOwnProperty(prop)) {
                this.icons[prop] = new FaIcon(this.vm.commands[prop].icon, '');
            }
        }
    }

    private readonly vm: CommandCollectionViewModel;

    private isMultiExecutionAllowed = false;
    private isEnabled = true;
    private executionCount = 0;

    private readonly icons: { [name: string]: FaIcon; } = {};

    icon(name: string = 'default') {
        return this.icons[name];
    }

    setText(text: string) {
        this.forEachCommand(c => c.text(text));
    }

    setTextFor(name: string, text: string) {
        this.vm.commands[name].text(text);
    }

    makePrimary() {
        this.forEachCommand(c => ContextualClass.primary(c.contextualClass));
    }

    makePrimaryFor(name: string) {
        ContextualClass.primary(this.vm.commands[name].contextualClass);
    }

    makeDanger() {
        this.forEachCommand(c => ContextualClass.danger(c.contextualClass));
    }

    makeDangerFor(name: string) {
        ContextualClass.danger(this.vm.commands[name].contextualClass);
    }

    setActive() {
        this.forEachCommand(c => c.isActive(true));
    }

    setInactive() {
        this.forEachCommand(c => c.isActive(false));
    }

    allowMultiExecution() {
        this.isMultiExecutionAllowed = true;
    }

    show() {
        this.forEachCommand(c => c.isVisible(true));
    }

    hide() {
        this.forEachCommand(c => c.isVisible(false));
    }

    enable() {
        this.isEnabled = true;
        this.updateIsEnabled();
    }

    disable() {
        this.updateIsEnabled();
    }

    private updateIsEnabled() {
        let isEnabled = this.isEnabled && this.executionCount === 0;
        this.forEachCommand(c => c.isEnabled(isEnabled));
    }

    private forEachCommand(action: (c: CommandViewModel) => void) {
        for (let prop in this.vm.commands) {
            if (this.vm.commands.hasOwnProperty(prop)) {
                action(this.vm.commands[prop]);
            }
        }
    }

    async execute(context?: any) {
        let canExecute = this.canExecute();
        if (canExecute) {
            this.executionCount++;
            this.updateIsEnabled();
            try {
                await this.action(context);
            }
            finally {
                this.executionCount--;
                this.updateIsEnabled();
            }
        }
    }

    private canExecute() {
        return this.isEnabled && (this.isMultiExecutionAllowed || this.executionCount === 0);
    }
}

export class Command extends AsyncCommand {
    constructor(
        vm: CommandViewModel,
        action: (context?: any) => void
    ) {
        super(vm, (c?: any) => {
            return new Promise((resolve, reject) => {
                try {
                    action(c);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
