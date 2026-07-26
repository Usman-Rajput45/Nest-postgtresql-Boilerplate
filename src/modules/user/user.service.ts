import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../database/models/user.model';
import { Role } from '../../enums/role.enum';
import type { UserCredentialRecord, UserPublic } from './user.types';

function mapUserToPublic(user: User): UserPublic {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function mapUserToCredential(user: User): UserCredentialRecord {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    password: user.password,
  };
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    return this.userModel.findOne({
      where: { email: normalized },
    });
  }

  async findCredentialByEmail(email: string): Promise<UserCredentialRecord | null> {
    const user = await this.findByEmail(email);
    if (user === null) {
      return null;
    }
    return mapUserToCredential(user);
  }

  async findPublicById(id: string): Promise<UserPublic | null> {
    const user = await this.userModel.findByPk(id);
    if (user === null) {
      return null;
    }
    return mapUserToPublic(user);
  }

  async createUser(input: {
    email: string;
    passwordHash: string;
    role?: Role;
  }): Promise<UserPublic> {
    const normalizedEmail = input.email.trim().toLowerCase();
    const user = await this.userModel.create({
      email: normalizedEmail,
      password: input.passwordHash,
      role: input.role ?? Role.USER,
    });
    return mapUserToPublic(user);
  }
}
