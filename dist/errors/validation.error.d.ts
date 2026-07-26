import { BaseError } from './base.error';
export declare class AppValidationError extends BaseError {
    readonly details: unknown;
    constructor(message?: string, details?: unknown, statusCode?: number);
}
