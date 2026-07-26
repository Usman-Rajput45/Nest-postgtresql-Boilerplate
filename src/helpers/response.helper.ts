import type { ApiErrorBody, ApiResponse, ApiSuccessBody } from '../responses/api.response';

export function buildSuccessResponse<T>(
  message: string,
  statusCode: number,
  data?: T,
): ApiSuccessBody<T> {
  const body: ApiSuccessBody<T> = {
    success: true,
    message,
    statusCode,
  };
  if (data !== undefined) {
    body.data = data;
  }
  return body;
}

export function buildErrorResponse(
  message: string,
  statusCode: number,
  error?: unknown,
): ApiErrorBody {
  const body: ApiErrorBody = {
    success: false,
    message,
    statusCode,
  };
  if (error !== undefined) {
    body.error = error;
  }
  return body;
}

export function isApiResponse(value: unknown): value is ApiResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const v = value as Record<string, unknown>;
  return typeof v.success === 'boolean' && typeof v.message === 'string';
}
