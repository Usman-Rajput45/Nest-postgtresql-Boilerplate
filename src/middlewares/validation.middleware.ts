import { ValidationPipe } from '@nestjs/common';
import { MESSAGES } from '../constants/messages.constant';
import { STATUS_CODES } from '../constants/status-codes.constant';
import { AppValidationError } from '../errors/validation.error';

function mapValidationErrors(errors: unknown): unknown {
  return errors;
}

export function createGlobalValidationPipe(): ValidationPipe {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    exceptionFactory: (errors) =>
      new AppValidationError(
        MESSAGES.VALIDATION.FAILED,
        mapValidationErrors(errors),
        STATUS_CODES.BAD_REQUEST,
      ),
  });
}
