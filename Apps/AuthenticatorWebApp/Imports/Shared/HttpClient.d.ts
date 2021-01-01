export declare class HttpPostResult {
    readonly result: any;
    readonly url: string;
    readonly status: number;
    readonly responseText: string;
    constructor(result: any, url: string, status: number, responseText: string);
    isSuccessful(): boolean;
    toString(): string;
}
export declare class HttpClient {
    get(url: string): Promise<HttpPostResult>;
    post(url: string, data: string): Promise<HttpPostResult>;
    private execute;
}
