import { ComponentTemplate } from "../ComponentTemplate";
import * as template from './CommandButton.html';
import { CommandViewModel } from '../Command';

export class CommandButtonTemplate extends ComponentTemplate {
    constructor() {
        super('command-button', template);
    }
}

export function createCommandButtonViewModel() {
    let commandVM = new CommandViewModel();
    new CommandButtonTemplate().register();
    commandVM.template('command-button');
    return commandVM;
}