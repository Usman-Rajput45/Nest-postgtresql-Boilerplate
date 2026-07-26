import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';
import { MESSAGES } from '../../constants/messages.constant';
import { STATUS_CODES } from '../../constants/status-codes.constant';
import { BaseError } from '../../errors/base.error';
import { buildSuccessResponse } from '../../helpers/response.helper';
import { UserService } from './user.service';
import { USER_PATHS, USER_ROUTE_PREFIX } from './user.routes';

@Controller(USER_ROUTE_PREFIX)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(USER_PATHS.ME)
  async getProfile(@Req() req: Request) {
    const userId = req.user?.id;
    if (userId === undefined) {
      throw new BaseError(
        MESSAGES.AUTH.UNAUTHORIZED,
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    const profile = await this.userService.findPublicById(userId);
    if (profile === null) {
      throw new BaseError(MESSAGES.USER.NOT_FOUND, STATUS_CODES.NOT_FOUND);
    }
    return buildSuccessResponse(
      MESSAGES.USER.PROFILE_RETRIEVED,
      STATUS_CODES.OK,
      profile,
    );
  }
}
