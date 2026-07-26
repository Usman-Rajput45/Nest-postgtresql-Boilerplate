import { MESSAGES } from '../constants/messages.constant';
import { STATUS_CODES } from '../constants/status-codes.constant';
import { BaseError } from './base.error';

export class AppValidationError extends BaseError {
  public readonly details: unknown;

  constructor(
    message: string = MESSAGES.VALIDATION.FAILED,
    details?: unknown,
    statusCode: number = STATUS_CODES.BAD_REQUEST,
  ) {
    super(message, statusCode);
    this.details = details;
  }
}
