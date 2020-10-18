import { HubAppApi } from './Api/HubAppApi';
import { Command } from './Command';
import { PageFrameViewModel } from './PageFrameViewModel';
import { WebPage } from './WebPage';

export class PageFrame {
    constructor(private readonly vm: PageFrameViewModel, private readonly hub: HubAppApi) {
    }
}