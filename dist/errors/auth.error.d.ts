import { BaseError } from './base.error';
export declare class AuthError extends BaseError {
    constructor(message?: string, statusCode?: number);
}
