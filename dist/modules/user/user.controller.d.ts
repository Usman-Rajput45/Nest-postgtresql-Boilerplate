import type { Request } from 'express';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: Request): Promise<import("../../responses/api.response").ApiSuccessBody<import("./user.types").UserPublic>>;
}
