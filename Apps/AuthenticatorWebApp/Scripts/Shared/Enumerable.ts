import * as _ from 'lodash';

export interface IEnumerable<T> {
    value(): T[];
}

export class EnumerableArray<T> implements IEnumerable<T> {
    static create<T>(source: T[] | IEnumerable<T>) {
        if (_.isArray(source)) {
            return new EnumerableArray(source);
        }
        return source;
    }

    constructor(private readonly source: T[] | IEnumerable<T>) {
    }

    value() {
        if (_.isArray(this.source)) {
            return this.source;
        }
        return this.source.value();
    }

    isArray() { return _.isArray(this.source); }

}

export class MappedArray<T, TResult> implements IEnumerable<TResult> {
    constructor(
        source: T[] | IEnumerable<T>,
        private readonly map: (item: T) => TResult
    ) {
        this.source = EnumerableArray.create(source);
    }

    private readonly source: IEnumerable<T>;

    value() { return _.map(this.source.value(), this.map); }
}

export class FilteredArray<T> implements IEnumerable<T> {
    constructor(
        source: T[] | IEnumerable<T>,
        private readonly isMatch: (item: T) => boolean
    ) {
        this.source = EnumerableArray.create(source);
    }

    private readonly source: IEnumerable<T>;

    value() { return _.filter(this.source.value(), this.isMatch); }
}

export class First<T> {
    constructor(
        source: T[] | IEnumerable<T>
    ) {
        this.source = EnumerableArray.create(source);
    }

    private readonly source: IEnumerable<T>;

    value() { return this.source.value()[0]; }
}