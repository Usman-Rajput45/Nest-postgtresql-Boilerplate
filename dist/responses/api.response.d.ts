export type ApiSuccessBody<T> = {
    success: true;
    message: string;
    data?: T;
    statusCode: number;
};
export type ApiErrorBody = {
    success: false;
    message: string;
    error?: unknown;
    statusCode: number;
};
export type ApiResponse<T = unknown> = ApiSuccessBody<T> | ApiErrorBody;
