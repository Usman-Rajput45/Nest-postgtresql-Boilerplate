import type { ApiErrorBody, ApiResponse, ApiSuccessBody } from '../responses/api.response';
export declare function buildSuccessResponse<T>(message: string, statusCode: number, data?: T): ApiSuccessBody<T>;
export declare function buildErrorResponse(message: string, statusCode: number, error?: unknown): ApiErrorBody;
export declare function isApiResponse(value: unknown): value is ApiResponse;
