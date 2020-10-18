import 'reflect-metadata';
import { UserPageViewModel } from "./UserPageViewModel";
import { Alert } from '../Alert';
import { UrlBuilder } from '../UrlBuilder';
import { startup } from 'xtistart';
import { WebPage } from '../WebPage';
import { singleton, container } from 'tsyringe';
import { AppApi } from '../AppApi';

@singleton()
class UserPage {
    constructor(private readonly vm: UserPageViewModel) {
        this.goToReturnUrl();
    }

    private goToReturnUrl() {
        this.alert.info('Opening Page...');
        let urlBuilder = UrlBuilder.current();
        let returnUrl = urlBuilder.getQueryValue('returnUrl');
        if (returnUrl) {
            returnUrl = decodeURIComponent(returnUrl);
        }
        returnUrl = container.resolve(AppApi).url.addPart(returnUrl).getUrl();
        new WebPage(returnUrl).open();
    }

    private readonly alert = new Alert(this.vm.alert);
}
startup(UserPageViewModel, UserPage);