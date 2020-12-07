import { singleton } from 'tsyringe';

@singleton()
export class HostEnvironment {
    constructor() {
        this.isTest = pageContext.EnvironmentName === 'Test';
        this.isDevelopment = pageContext.EnvironmentName === 'Development';
        this.isStaging = pageContext.EnvironmentName === 'Staging';
        this.isProduction = pageContext.EnvironmentName === 'Production';
    }

    readonly isTest: boolean;
    readonly isDevelopment: boolean;
    readonly isStaging: boolean;
    readonly isProduction: boolean;
}