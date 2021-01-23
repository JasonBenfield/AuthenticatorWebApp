import * as ko from "knockout";
export declare class ComponentViewModel implements IComponentViewModel {
    constructor(componentTemplate: IComponentTemplate);
    readonly componentName: ko.Observable<string>;
}
