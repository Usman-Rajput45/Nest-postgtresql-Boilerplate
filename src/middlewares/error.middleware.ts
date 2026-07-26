import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import { MESSAGES } from '../constants/messages.constant';
import { STATUS_CODES } from '../constants/status-codes.constant';
import { BaseError } from '../errors/base.error';
import { AppValidationError } from '../errors/validation.error';
import { buildErrorResponse } from '../helpers/response.helper';
import { logger } from '../utils/logger.util';

function extractHttpExceptionBody(exception: HttpException): unknown {
  const body = exception.getResponse();
  if (typeof body === 'string') {
    return { message: body };
  }
  return body;
}

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppValidationError) {
      response
        .status(exception.statusCode)
        .json(
          buildErrorResponse(
            exception.message,
            exception.statusCode,
            exception.details,
          ),
        );
      return;
    }

    if (exception instanceof BaseError) {
      response
        .status(exception.statusCode)
        .json(buildErrorResponse(exception.message, exception.statusCode));
      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      response
        .status(statusCode)
        .json(
          buildErrorResponse(
            exception.message,
            statusCode,
            extractHttpExceptionBody(exception),
          ),
        );
      return;
    }

    logger.error(MESSAGES.GENERIC.INTERNAL_ERROR, exception);
    response
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(
        buildErrorResponse(
          MESSAGES.GENERIC.INTERNAL_ERROR,
          STATUS_CODES.INTERNAL_SERVER_ERROR,
        ),
      );
  }
}
