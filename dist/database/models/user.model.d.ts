import { Model } from 'sequelize-typescript';
import { Role } from '../../enums/role.enum';
export declare class User extends Model {
    id: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
