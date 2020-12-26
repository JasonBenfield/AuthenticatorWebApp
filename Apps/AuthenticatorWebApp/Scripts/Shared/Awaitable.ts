export class Awaitable<TResult> {
    private _resolve: (value: TResult) => void = null;

    isInProgress() {
        return this._resolve !== null;
    }

    start() {
        return new Promise<TResult>((resolve) => {
            this._resolve = resolve;
        });
    }

    resolve(result: TResult) {
        let resolve = this._resolve;
        this._resolve = null;
        if (resolve) {
            resolve(result);
        }
    }
}