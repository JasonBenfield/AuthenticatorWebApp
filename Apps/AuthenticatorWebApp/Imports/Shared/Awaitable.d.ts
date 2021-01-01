export declare class Awaitable<TResult> {
    private _resolve;
    isInProgress(): boolean;
    start(): Promise<TResult>;
    resolve(result: TResult): void;
}
