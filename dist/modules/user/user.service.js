"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../../database/models/user.model");
const role_enum_1 = require("../../enums/role.enum");
function mapUserToPublic(user) {
    return {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
function mapUserToCredential(user) {
    return {
        id: user.id,
        email: user.email,
        role: user.role,
        password: user.password,
    };
}
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByEmail(email) {
        const normalized = email.trim().toLowerCase();
        return this.userModel.findOne({
            where: { email: normalized },
        });
    }
    async findCredentialByEmail(email) {
        const user = await this.findByEmail(email);
        if (user === null) {
            return null;
        }
        return mapUserToCredential(user);
    }
    async findPublicById(id) {
        const user = await this.userModel.findByPk(id);
        if (user === null) {
            return null;
        }
        return mapUserToPublic(user);
    }
    async createUser(input) {
        const normalizedEmail = input.email.trim().toLowerCase();
        const user = await this.userModel.create({
            email: normalizedEmail,
            password: input.passwordHash,
            role: input.role ?? role_enum_1.Role.USER,
        });
        return mapUserToPublic(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map