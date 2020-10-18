import * as ko from 'knockout';

export class ComponentTemplate {
    constructor(private readonly name: string, private readonly html: any) {
    }

    register() {
        if (!ko.components.isRegistered(this.name)) {
            ko.components.register(this.name, { template: this.html });
        }
    }
}