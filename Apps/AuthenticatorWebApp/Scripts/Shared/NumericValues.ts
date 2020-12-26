import { FilteredArray, First } from "./Enumerable"
import { NumericValue } from "./NumericValue";

export class NumericValues<T extends NumericValue> {
    constructor(public readonly all: T[]) {
    }

    value(testValue: T | string | number) {
        return new First(
            new FilteredArray(
                this.all,
                nv => nv.equals(testValue)
            )
        ).value() || this.all[0];
    }
}