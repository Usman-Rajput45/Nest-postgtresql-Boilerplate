import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    getHealth(): import("../../responses/api.response").ApiSuccessBody<import("./health.types").HealthStatus>;
}
