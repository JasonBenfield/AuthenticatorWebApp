import * as ko from 'knockout';

export class ComponentTemplateAsync {
    constructor(private readonly name: string, private readonly url: any) {
    }

    register() {
        if (!ko.components.isRegistered(this.name)) {
            ko.components.register(this.name, {
                template: {
                    templateUrl: this.url
                }
            });
        }
    }
}