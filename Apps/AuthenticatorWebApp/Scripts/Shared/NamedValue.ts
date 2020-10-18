export class NamedValue {
    constructor(public readonly name: string, public readonly value: string) {
    }

    toString() {
        let str = this.name;
        if (this.value) {
            str += '=' + this.value;
        }
        return str;
    }
}