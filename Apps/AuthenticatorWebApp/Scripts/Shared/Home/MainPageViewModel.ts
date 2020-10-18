import * as template from './MainPage.html';
import * as ko from 'knockout';
import { PageViewModel } from '../PageViewModel';
import { singleton } from 'tsyringe';

@singleton()
export class MainPageViewModel extends PageViewModel {
    constructor() {
        super(template);
    }
    readonly telephoneNumber = ko.observable<string>('');
}