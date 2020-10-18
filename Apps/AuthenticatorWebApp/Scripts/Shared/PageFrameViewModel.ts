import { ModalErrorComponentViewModel } from './Error/ModalErrorComponentViewModel';
import * as ko from 'knockout';
import { inject, singleton } from 'tsyringe';
import { HubAppApi } from './Api/HubAppApi';

@singleton()
export class PageFrameViewModel {
    constructor(
        @inject('PageVM') public readonly page: any,
        public readonly modalError: ModalErrorComponentViewModel,
        hub: HubAppApi
    ) {
        this.appTitle(pageContext.AppTitle);
        this.pageTitle(pageContext.PageTitle);
        let title: string;
        if (pageContext.PageTitle) {
            title = `${pageContext.AppTitle} - ${pageContext.PageTitle}`;
        }
        else {
            title = pageContext.AppTitle;
        }
        document.title = title;
        this.isAuthenticated(pageContext.IsAuthenticated);
        this.userName(pageContext.UserName);
        this.logoutUrl(hub.Auth.Logout.getUrl({}).getUrl());
    }

    readonly appTitle = ko.observable('');
    readonly pageTitle = ko.observable('');
    readonly isAuthenticated = ko.observable(false);
    readonly userName = ko.observable('');
    readonly logoutUrl = ko.observable('');
}