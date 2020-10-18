import { JoinedStrings } from "./JoinedStrings";

export class XtiPath {
    static app(appKey: string, version: string, modifier: string) {
        return new XtiPath(appKey, version, '', '', modifier);
    }

    constructor(
        app: string,
        version: string,
        group: string,
        action: string,
        modifier: string
    ) {
        this.app = app ? app : '';
        this.version = version ? version : '';
        this.group = group ? group : '';
        this.action = action ? action : '';
        this.modifier = modifier ? modifier : '';
        let parts = [this.app, this.version];
        if (this.group) {
            parts.push(this.group);
            if (this.action) {
                parts.push(this.action);
                if (this.modifier) {
                    parts.push(this.modifier);
                }
            }
        }
        this.value = new JoinedStrings('/', parts).value();
    }

    public readonly app: string;
    public readonly version: string;
    public readonly group: string;
    public readonly action: string;
    public readonly modifier: string;

    private readonly value: string;

    withGroup(group: string) {
        return new XtiPath(this.app, this.version, group, '', this.modifier);
    }

    withAction(action: string) {
        return new XtiPath(this.app, this.version, this.group, action, this.modifier);
    }

    format() {
        return this.value;
    }

    equals(other: XtiPath) {
        if (other) {
            return this.value === other.value;
        }
        return false;
    }

    toString() {
        return this.value;
    }
}