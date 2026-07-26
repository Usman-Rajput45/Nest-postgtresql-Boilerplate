import { MESSAGES } from '../constants/messages.constant';
import { STATUS_CODES } from '../constants/status-codes.constant';
import { BaseError } from './base.error';

export class AuthError extends BaseError {
  constructor(
    message: string = MESSAGES.AUTH.UNAUTHORIZED,
    statusCode: number = STATUS_CODES.UNAUTHORIZED,
  ) {
    super(message, statusCode);
  }
}
