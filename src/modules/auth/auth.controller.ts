import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MESSAGES } from '../../constants/messages.constant';
import { STATUS_CODES } from '../../constants/status-codes.constant';
import { buildSuccessResponse } from '../../helpers/response.helper';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { AUTH_PATHS, AUTH_ROUTE_PREFIX } from './auth.routes';

@Controller(AUTH_ROUTE_PREFIX)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_PATHS.REGISTER)
  @HttpCode(STATUS_CODES.CREATED)
  async register(@Body() dto: RegisterDto) {
    const data = await this.authService.register(dto);
    return buildSuccessResponse(
      MESSAGES.AUTH.REGISTER_SUCCESS,
      STATUS_CODES.CREATED,
      data,
    );
  }

  @Post(AUTH_PATHS.LOGIN)
  @HttpCode(STATUS_CODES.OK)
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return buildSuccessResponse(
      MESSAGES.AUTH.LOGIN_SUCCESS,
      STATUS_CODES.OK,
      data,
    );
  }
}
