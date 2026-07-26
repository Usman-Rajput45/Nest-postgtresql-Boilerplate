import type { Role } from '../../enums/role.enum';
export type UserPublic = {
    id: string;
    email: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
};
export type UserCredentialRecord = {
    id: string;
    email: string;
    role: Role;
    password: string;
};
