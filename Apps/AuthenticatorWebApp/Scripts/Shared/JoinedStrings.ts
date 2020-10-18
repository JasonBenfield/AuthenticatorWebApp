import { IEnumerable, EnumerableArray } from './Enumerable';

export class JoinedStrings {
    constructor(
        private readonly separator: string,
        arr: any[] | IEnumerable<string>,
        format?: (any) => string) {

        this.arr = new EnumerableArray(arr);
        this.format = format || function (value) {
            return value ? value.toString() : '';
        };
    }

    private readonly arr: IEnumerable<string>;
    private readonly format: (any) => string;
    private joined: string;

    value() {
        if (this.joined === undefined) {
            let result = '';
            for (let value of this.arr.value()) {
                if (result !== '') {
                    result += this.separator;
                }
                result += this.format(value);
            }
            this.joined = result;
        }
        return this.joined;
    }

    toString() {
        return this.value();
    }
}