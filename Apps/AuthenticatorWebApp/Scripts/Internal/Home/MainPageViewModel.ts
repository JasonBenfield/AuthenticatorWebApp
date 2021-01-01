import * as template from './MainPage.html';
import { PageViewModel } from 'XtiShared/PageViewModel';
import { singleton } from 'tsyringe';

@singleton()
export class MainPageViewModel extends PageViewModel {
    constructor() {
        super(template);
    }
}