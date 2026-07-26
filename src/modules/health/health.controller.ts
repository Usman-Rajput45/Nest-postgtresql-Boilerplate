import { Controller, Get } from '@nestjs/common';
import { MESSAGES } from '../../constants/messages.constant';
import { STATUS_CODES } from '../../constants/status-codes.constant';
import { buildSuccessResponse } from '../../helpers/response.helper';
import { HealthService } from './health.service';
import { HEALTH_PATHS, HEALTH_ROUTE_PREFIX } from './health.routes';

@Controller(HEALTH_ROUTE_PREFIX)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get(HEALTH_PATHS.STATUS)
  getHealth() {
    const data = this.healthService.getStatus();
    return buildSuccessResponse(
      MESSAGES.HEALTH.OK,
      STATUS_CODES.OK,
      data,
    );
  }
}
