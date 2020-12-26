import * as template from './MainPage.html';
import { PageViewModel } from '../../Shared/PageViewModel';
import { singleton } from 'tsyringe';

@singleton()
export class MainPageViewModel extends PageViewModel {
    constructor() {
        super(template);
    }
}