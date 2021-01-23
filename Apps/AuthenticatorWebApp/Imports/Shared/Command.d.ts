import * as ko from 'knockout';
import { DefaultEventHandler } from './Events';
import { FaIconViewModel, FaIcon } from './FaIcon';
import { ContextualClassViewModel } from './ContextualClass';
export declare class CommandViewModel implements IComponentViewModel {
    readonly componentName: ko.Observable<string>;
    readonly isVisible: ko.Observable<boolean>;
    readonly isEnabled: ko.Observable<boolean>;
    readonly icon: FaIconViewModel;
    readonly text: ko.Observable<string>;
    readonly textCss: ko.Observable<string>;
    readonly title: ko.Observable<string>;
    readonly isActive: ko.Observable<boolean>;
    readonly contextualClass: ContextualClassViewModel;
    private readonly _executeRequested;
    readonly executeRequested: DefaultEventHandler<any>;
    requestExecute(context: any): void;
}
export declare class CommandCollectionViewModel {
    readonly commands: {
        [name: string]: CommandViewModel;
    };
    constructor(commands: {
        [name: string]: CommandViewModel;
    });
    private readonly _executeRequested;
    readonly executeRequested: DefaultEventHandler<any>;
}
export declare class AsyncCommand {
    private readonly action;
    constructor(vm: CommandViewModel | CommandCollectionViewModel, action: (context?: any) => any);
    private readonly vm;
    private isMultiExecutionAllowed;
    private isEnabled;
    private executionCount;
    private readonly icons;
    icon(name?: string): FaIcon;
    positionIconRight(): void;
    positionIconRightFor(name: string): void;
    setText(text: string): void;
    setTextFor(name: string, text: string): void;
    setTitle(text: string): void;
    setTitleFor(name: string, title: string): void;
    makePrimary(): void;
    makePrimaryFor(name: string): void;
    makeSecondary(): void;
    makeSecondaryFor(name: string): void;
    makeLight(): void;
    makeLightFor(name: string): void;
    makeDark(): void;
    makeDarkFor(name: string): void;
    makeDanger(): void;
    makeDangerFor(name: string): void;
    setActive(): void;
    setInactive(): void;
    allowMultiExecution(): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    private updateIsEnabled;
    private forEachCommand;
    execute(context?: any): Promise<void>;
    private canExecute;
}
export declare class Command extends AsyncCommand {
    constructor(vm: CommandViewModel, action: (context?: any) => void);
}
