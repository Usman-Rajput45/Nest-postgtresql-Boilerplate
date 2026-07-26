export declare function asAsync<TArgs extends unknown[], TResult>(fn: (...args: TArgs) => Promise<TResult>): (...args: TArgs) => Promise<TResult>;
