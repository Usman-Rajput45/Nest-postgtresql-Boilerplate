import { User } from '../../database/models/user.model';
import { Role } from '../../enums/role.enum';
import type { UserCredentialRecord, UserPublic } from './user.types';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: typeof User);
    findByEmail(email: string): Promise<User | null>;
    findCredentialByEmail(email: string): Promise<UserCredentialRecord | null>;
    findPublicById(id: string): Promise<UserPublic | null>;
    createUser(input: {
        email: string;
        passwordHash: string;
        role?: Role;
    }): Promise<UserPublic>;
}
