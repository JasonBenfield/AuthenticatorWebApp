export class NumericValue {
    constructor(
        public readonly Value: number,
        public readonly DisplayText: string
    ) {
    }

    equalsAny(other: NumericValue[] | number[] | string[]) {
        for (let item of other) {
            if (this.equals(item)) {
                return true;
            }
        }
        return false;
    }

    equals(other: NumericValue | number | string) {
        if (other === undefined || other === null) {
            return false;
        }
        if (typeof other === "number") {
            return this.Value === other;
        }
        else if (typeof other === "string") {
            return this.normalizeDisplayText(this.DisplayText) === this.normalizeDisplayText(other);
        }
        return this.Value === other.Value;
    }

    private normalizeDisplayText(displayText: string) {
        return displayText.replace(/\s+/g, '').toLowerCase();
    }

    toString() {
        return `${this.constructor.name} ${this.Value} ${this.DisplayText}`;
    }
}