import { ComponentTemplate } from "../ComponentTemplate";
import * as template from './CommandPill.html';
import { CommandViewModel } from '../Command';

export class CommandPillTemplate extends ComponentTemplate {
    constructor() {
        super('command-pill', template);
    }
}

export function createCommandPillViewModel() {
    let commandVM = new CommandViewModel();
    new CommandPillTemplate().register();
    commandVM.template('command-pill');
    return commandVM;
}