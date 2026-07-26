import { type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import type { EnvConfig } from '../config/env.config';
export declare class JwtAuthMiddleware implements NestMiddleware {
    private readonly env;
    constructor(env: EnvConfig);
    use(req: Request, _res: Response, next: NextFunction): void;
}
