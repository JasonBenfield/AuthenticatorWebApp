import { Result } from "./Result";
export declare class Awaitable {
    private _resolve;
    isInProgress(): boolean;
    start(): Promise<Result>;
    resolve(result: Result): void;
}
