export declare class ComponentTemplate implements IComponentTemplate {
    readonly name: string;
    private readonly html;
    constructor(name: string, html: any);
    register(): void;
}
