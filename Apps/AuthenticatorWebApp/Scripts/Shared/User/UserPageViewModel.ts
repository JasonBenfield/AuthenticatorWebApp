import { singleton } from 'tsyringe';
import { AlertViewModel } from '../Alert';
import { PageViewModel } from '../PageViewModel';
import * as template from './UserPage.html';

@singleton()
export class UserPageViewModel extends PageViewModel {
    constructor() {
        super(template);
    }

    readonly alert = new AlertViewModel();
}