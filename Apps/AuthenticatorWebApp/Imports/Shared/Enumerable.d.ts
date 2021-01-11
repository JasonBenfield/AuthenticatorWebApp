export interface IEnumerable<T> {
    value(): T[];
}
export declare class EnumerableArray<T> implements IEnumerable<T> {
    private readonly source;
    static create<T>(source: T[] | IEnumerable<T>): IEnumerable<T>;
    constructor(source: T[] | IEnumerable<T>);
    value(): T[];
    isArray(): boolean;
}
export declare class MappedArray<T, TResult> implements IEnumerable<TResult> {
    private readonly map;
    constructor(source: T[] | IEnumerable<T>, map: (item: T) => TResult);
    private readonly source;
    value(): TResult[];
}
export declare class FilteredArray<T> implements IEnumerable<T> {
    private readonly isMatch;
    constructor(source: T[] | IEnumerable<T>, isMatch: (item: T) => boolean);
    private readonly source;
    value(): T[];
}
export declare class First<T> {
    constructor(source: T[] | IEnumerable<T>);
    private readonly source;
    value(): T;
}
export declare class Any<T> {
    constructor(source: T[] | IEnumerable<T>);
    private readonly source;
    value(): boolean;
}
