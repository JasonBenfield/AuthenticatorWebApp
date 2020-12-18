import * as ko from 'knockout';
import * as template from './Templates/PageFrame.html';
import './Styles/default.scss';
import { ComponentTemplate } from './ComponentTemplate';
import 'tslib';
import { SubmitBindingHandler } from './SubmitBindingHandler';
import { ModalBindingHandler } from './ModalBindingHandler';
import { container } from 'tsyringe';
import { PageFrameViewModel } from './PageFrameViewModel';
import { UrlBuilder } from './UrlBuilder';
import { ConsoleLog } from './ConsoleLog';

export class PageLoader {
    load() {
        let defaultConfigLoader = {
            getConfig: (name: string, callback) => {
                if (name.indexOf('/') > -1) {
                    callback({
                        template: { templateUrl: name },
                        synchronous: true
                    });
                }
                else {
                    callback(null);
                }
            }
        };
        let defaultComponentLoader = {
            loadComponent: (name: string, config, callback) => {
                let templateConfig = config.template;
                if (templateConfig.templateUrl) {
                    this.loadFromTemplateUrl(templateConfig.templateUrl, callback, templateConfig.errorMarkup);
                }
                else if (templateConfig.containerID) {
                    let container = document.getElementById(templateConfig.containerID);
                    callback({
                        template: container && container.childNodes,
                        createViewModel: this.createViewModel
                    });
                }
                else {
                    callback(null);
                }
            }
        };
        ko.components.loaders.unshift(defaultConfigLoader);
        ko.components.loaders.unshift(defaultComponentLoader);
        new ComponentTemplate('page-frame', template).register();
        ko.options.deferUpdates = true;
        ko.bindingHandlers.submit = new SubmitBindingHandler();
        ko.bindingHandlers.modal = new ModalBindingHandler();
        let page = container.resolve('Page');
        let pageFrameVM = container.resolve(PageFrameViewModel);
        ko.applyBindings(pageFrameVM);
    }


    private createViewModel(params, componentInf) {
        return params;
    }

    private loadFromTemplateUrl(templateUrl: string, callback: (config) => void, getErrorMarkup: (err: any) => string) {
        let urlBuilder = new UrlBuilder(templateUrl);
        if (!urlBuilder.hasQuery('cacheBust')) {
            urlBuilder.addQuery('cacheBust', pageContext.CacheBust);
        }
        let url = urlBuilder.getUrl();
        function reqListener() {
            console.log(this.responseText);
        }
        let oReq = new XMLHttpRequest();
        oReq.withCredentials = true;
        oReq.onreadystatechange = () => {
            if (oReq.readyState == 4) {
                if (oReq.status === 200) {
                    let template = ko.utils.parseHtmlFragment(oReq.responseText);
                    callback({
                        template: template,
                        createViewModel: this.createViewModel
                    });
                }
                else {
                    new ConsoleLog().error(`Error loading ${url}\r\nStatus: ${oReq.status}\r\n${oReq.responseText}`);
                    callback({
                        template: '',
                        createViewModel: (params, componentInfo) => {
                            return params;
                        }
                    });
                    ko.components.clearCachedDefinition(templateUrl);
                }
            }
        };
        oReq.addEventListener("load", reqListener.bind(oReq));
        oReq.open('GET', url);
        oReq.setRequestHeader("cache-control", "private");
        oReq.send('');
    }
}