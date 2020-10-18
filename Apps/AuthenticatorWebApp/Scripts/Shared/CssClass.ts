import { JoinedStrings } from "./JoinedStrings";

export class CssClass {
    constructor(...initialNames: string[]) {
        if (initialNames) {
            this.addNames(...initialNames);
        }
    }

    private value: string | null = null;
    private readonly names: string[] = [];

    addName(name: string) {
        return this.addNames(name);
    }

    addNames(...names: string[]) {
        let added = false;
        for (let name of names) {
            if (this._addName(name)) {
                added = true;
            }
        }
        if (added) {
            this.updateValue();
        }
        return this;
    }

    private _addName(name: string) {
        let added = false;
        if (name) {
            let nameParts = name.split(/\s+/);
            if (nameParts.length > 1) {
                for (let namePart of nameParts) {
                    if (this._addName(namePart)) {
                        added = true;
                    }
                }
            }
            else {
                let index = this.names.indexOf(nameParts[0]);
                if (index < 0) {
                    this.names.push(nameParts[0]);
                    added = true;
                }
            }
        }
        return added;
    }

    removeName(name: string) {
        return this.removeNames(name);
    }

    removeNames(...names: string[]) {
        let removed = false;
        for (let name of names) {
            if (this._removeName(name)) {
                removed = true;
            }
        }
        if (removed) {
            this.updateValue();
        }
        return this;
    }

    private _removeName(name: string) {
        let removed = false;
        if (name) {
            let nameParts = name.split(/\s+/);
            if (nameParts.length > 1) {
                for (let namePart of nameParts) {
                    if (this._removeName(namePart)) {
                        removed = true;
                    }
                }
            }
            else {
                let index = this.names.indexOf(nameParts[0]);
                if (index < 0) {
                    this.names.splice(index, 1);
                    removed = true;
                }
            }
        }
        return removed;
    }

    private updateValue() {
        this.value = this.names.length > 0 ? new JoinedStrings(' ', this.names).value() : null;
    }

    toString() {
        return this.value;
    }
}